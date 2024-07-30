---
title: "基於 Ollama 和 LangChain 的 Naive RAG 實作(搭配 streamlit UI)"
date: 2024-07-30T23:55:29+08:00
tags: ["GenAI", "RAG", "Ollama", "LangChain", "AI", "mistral"]
draft: false
Categories: programming     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "本文將介紹一個使用 Streamlit、Ollama 和 LangChain 構建的文件查詢系統。"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
mermaid: true
hidemeta: false
canonicalURL: "https://intervalrain.github.io/"
disableHLJS: true
disableShare: true
disableHLJS: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowCodeCopyButtons: true
---

> 在此為確保程式碼的可執行性，使用了免費的模型，若要求性能，可以使用替代方案。

[完整程式碼](https://github.com/intervalrain/rag_demo)

## Basic Moves

### 1. 載入文件
```python
loader = WebBaseLoader(urls_list)
documents = loader.load()
```
+ 使用 `WebBaseLoader` 從給定的 URL 列表中載入文件。在這裡可以根據需求替換其它 Loader。
    + `PyPDFLoader` 用於 PDF 文件。
    + `TextLoader` 用於純文本文件。

### 2. 分割文件
```python
pythonCopytext_splitter = CharacterTextSplitter.from_tiktoken_encoder(chunk_size=7500, chunk_overlap=100)
doc_splits = text_splitter.split_documents(documents)
```
+ 文件分割是一個關鍵步驟。這裡使用 `CharacterTextSplitter` 並基於 `tiktoken` 編碼器進行分割。
+ 參數說明:
    + `chunk_size`: 定義每個 chunk 的最大 token 數。較大的 chunk 可能包含更多上下文，但可能降低檢索精度。
    + `chunk_overlap`: 定義相鄰塊之間的重疊 token 數。增加重疊可以幫助保持上下文連續性，但會增加記憶體需求。
+ 替代方案:
    + `RecursiveCharacterTextSplitter`: 可以更智能地處理文檔結構。
    + `TokenTextSplitter`: 直接基於標記進行分割，可能更準確但速度較慢。

### 3. 選擇 embedding 模型
```python
pythonCopyembeddings = OllamaEmbeddings(model="mistral")
```
+ 這裡使用 `Ollama` 的 `Mistral` 模型生成嵌入。
+ 替代方案:
    + `OpenAI`
    + `HuggingFace`
    + `Gemini`

### 4. 創建向量資料庫
```python
pythonCopyvector_store = Chroma.from_documents(
    documents = doc_splits,
    embedding = embeddings,
    collection_name = "rag-chroma",
)
```
+ 替代方案: 
    + `FAISS` (Meta 的)
    + `Milvus`
    + `Pinecone`

### 5. 建立 Retriever Interface
```python
retriever = vector_store.as_retriever()
```
+ 可以通過設置參數 `search_type` 與 `search_kwargs` 來調整檢索行為。

### 6. 執行 RAG
```python
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
```
+ 定義 RAG 鏈。可以通過修改 prompt 或使用不同的 LLM 來優化性能。

### 7. 查詢
```python
return rag_chain.invoke(question)
```
+ 調用 RAG 鏈針對輸入的問題返回答案。

## Advanced Moves

### 加入 metadata 並進行篩選:
```python
loader = WebBaseLoader(urls_list)
loader.requests_kwargs = {'verify':False}
docs = loader.load()
docs = [Document(page_content=doc.page_content, metadata={"source": doc.metadata['source']}) for doc in docs]

# 在檢索時使用 metadata 篩選
retriever = vector_store.as_retriever(search_kwargs={"filter": {"source": "特定URL"}})
```

### 加入 pre/post retrieval 處理:
```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=retriever
)
```

### 加入 rerank 提升回答的加權:
```python
from langchain.retrievers import EnsembleRetriever

bm25_retriever = BM25Retriever.from_documents(documents)
ensemble_retriever = EnsembleRetriever(
    retrievers=[retriever, bm25_retriever],
    weights=[0.5, 0.5]
)
```

### 改變 naive RAG 為 graph RAG:
```python
from langchain.graphs import NetworkxEntityGraph
from langchain.indexes import GraphIndexCreator

graph_creator = GraphIndexCreator(
    graph_type=NetworkxEntityGraph,
    include_embeddings=True
)
graph = graph_creator.from_documents(documents)

# 使用 graph RAG
retrieved_nodes = graph.get_relevant_nodes(query)
```