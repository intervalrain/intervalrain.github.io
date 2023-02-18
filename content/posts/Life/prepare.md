---
title: "[Life] July's plan"
date: 2022-07-16T17:48:09+08:00
tags: ["Life"]
draft: false
Categories: Life     # Programming, Create, Cover, Life, Semiconductor, Leetcode, Logic Design, Daily, OS, CS50, CA
description: "Study plan for July" 
author: "intervalrain"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: true
math: true                  # KaTex or not
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
cover:
    image: "/images/cover.jpg"
    alt: "Oh! You closed up the window, so you cannot see raining"
    relative: false
    hidden: false
---

### Next step:

Technical Phone Interview:

+ Duration: 45mins
+ Google Hangouts call (video is optional)
+ Coding is done on Google Docs

Please ensure you have a working internet connection and current web browser :)

There will be about 1-3 different questions (dependent on complexity - e.g. 1 Hard OR 2 Medium problems) related to coding, data structures and algorithms. You will be expected to come up with optimized and production-ready code, free of bugs. You should not write in pseudo-code.

I would highly recommend watching this [video](https://youtu.be/lDTKnzrX6qU) first to get a good grasp of the tips/ideas/areas of focus for the interviews here at Google. Do then read the next part to concretise these interview tips.

### *Refresh yourself with CS fundamentals*

+ We do expect you to know a lot about algorithms and data structures and especially be able to implement them into your solutions - there is a great bigocheatsheet that may also help you!
+ [Steve Yegge’s Blog](http://steve-yegge.blogspot.co.uk/2008/03/get-that-job-at-google.html)
+ [Google Style Guides (C++)](https://google.github.io/styleguide/cppguide.html)
+ [Geek for Geeks - Study algorithms and data structure](https://www.geeksforgeeks.org/)
+ System Design resources:
    + [System design interview tip!](https://www.palantir.com/2011/10/how-to-ace-a-systems-design-interview/)
    + [Hired in Tech](https://www.hiredintech.com/classrooms/system-design/lesson/52)



### *Coding Practice + CS review*

When you practice, do not use an IDE. You need to be able to write legible, compilable code without help with regards to layout, or spelling of standard library class/method names. I suggest solving similar style algorithmic/ DS problems on a google document or on paper to simulate a real interview. Several sites that provide similar problems to those typically asked in the interview are:

+ [Leetcode](https://leetcode.com/)
+ [Code Jam Kickstart](https://code.google.com/codejam/kickstart/) - great practice to get a glimpse of [Google coding and algorithm questions](https://code.google.com/codejam/past-contests#kickstart). Code Jam hosts online Kickstart rounds that give participants the opportunity to test and grow their coding abilities! Participate in [one](https://code.google.com/codejam/kickstart/schedule#kickstart)—or join them all! You can also learn how to solve those problems by reading our [analysis](https://code.google.com/codejam/contest/3254486/dashboard#s=a)
[Codeforces](http://codeforces.com/contests)
[HackerRank](https://www.hackerrank.com/)
[Topcoder](https://community.topcoder.com/tc?module=MatchDetails&rd=15712)
[ACM-ICPC](https://icpc.baylor.edu/)
[Code Jam](https://code.google.com/codejam/)

### *Below are some tips for your Coding Rounds:*

+ Write very clean, well-structured code and proactively address potential errors. Exhibit advanced coding approach (e.g. may have conducted exhaustive error-checking for boundary conditions, use appropriate idiomatic constructs in code, etc.

+ Test covered several corner cases, tests are simple but thorough - (dependency injection, no static cling, etc.)

+ Identify data structures to design a solution with optimal efficiency. 

+ Propose multiple algorithmic approaches to single and compound problems. 

+ Identify an optimal solution for given time-space tradeoffs. 

+ Propose novel, creative algorithmic solutions or come up with alternative optimal solutions for different constraints.

+ Create a workable design for a complex problem using a sound problem solving approach (e.g., gathered requirements, identified solutions, mapped solutions to design, understand constraints and trade-offs, estimated unknowns reasonably)

+ Show robust comprehension of problems, identifying supplemental contingencies/challenges. Provide examples and/or alternative explanations to clarify rationale. Communicate code/algorithms/etc. in a way that leaves no room for confusion.

+ Translate ideas into code/action without the need for revision. Proactively identify and provide solutions for additional considerations beyond the initial problem, expanding the complexity/scope of solution.

### *Important areas of assessment*

+ Coding - Good code quality (No IDE. Fully functional code. Take care of syntax, good language constructs, clean and concise code) & coding fast (you can code in Codechef timed challenges to practise coding under time pressure)

+ DS & Algo - Refer to below topics on what we are assessing for

+ Good communication - Talk out loud, explain your thought process to the interviewer

+ Attitude - Being independent, lead/drive the discussion forward while being receptive to hints from interviewers and integrating it in your solution

+ Speed of solving the question (Ideally 20mins per question - refer to below notes on time allocation)

### *Strategy for Success (Framework)*

+ Step 1: Clarify the problem
+ Step 2: Define your approach
+ Step 3: Propose a solution
    + Propose a solution before coding.
    + Feel free to say that your first solution will be refined later
    + Run through at least one or two examples to check for correctness
    + Use reasonable variable names or clean up the code after the first pass
    + Ask if the interviewer has any questions before refinement
+ Step 4: Propose an alternative solution
+ Step 5: Implementation

### *Time Allocation During Interview (Suggestion from Googlers for your reference)*

    + Solve 1 question in 20 mins
    + 2 mins for gathering all requirements and asking clarifying questions from the interviewer.
    + Approx 8-10 mins for coming up with a valid solution to the question, discuss with the interviewer about your solution, trade offs, the time and space complexity.
    + 5 mins for coding the solution.
    + 5 mins for dry run (sample test cases) along with discussion with the interviewer.

### *Breakdown of Framework*

+ Tip 1: Think out Loud & Communicate your Thought Process
    + Google interviewers are assessing you based on your problem solving skills, and want to know your full thought process behind why and how you derived the final result

    + Talk through your entire thought process & explain about your approach, how you derive a certain algorithm, explain the trade offs, and discuss the complexity of the solutions you are proposing and explain your code (Talk and Code).

    + Most important would be to pick the right data structure and algorithm for a specific problem! Talk about how they're implemented and why you'd choose one implementation or data structure instead of another.

    + Do not mumble to yourself or keep silent when thinking. 

+ Tip 2: Ask Clarifying Questions (Very Important!)

    + Never jump straight and code up the solution. Always take a pause, look at the interview question and ask some clarifying questions

    + These clarifying questions should enable you to cover for edge/boundary cases better and to define the scope of the question. Eg:"Describe a good algorithm for sorting a million numbers"
        + Good Clarifying Questions:
            + What is the range of the numbers? How are they distributed? Are the numbers integers or floating points?  How much memory is available? Are there duplicates?

+ Tip 3: Discuss algorithmic complexities & Identify all Edge Cases Independently

    + For Algorithms, you will need to know big-o notation very well.

    + Always state time and space complexities upfront. Think of how you can reduce the complexity further to reach an optimised solution!

    + Distinguish between average case/worst case runtime

    + Consider amortized time complexities!

    + The goal is to reach the most optimised solution at the end of the interview, and to have a complete working solution.

+ Tip 4: Test your Code

    + Check for boundary conditions!

    + Stress tests to ensure that the code runs within time constraint

    + Create tests that have 100% code coverage

    + Rectify any bugs in your code before the interviewer points it out

+ Tip 5: Ensure Good Code Quality on Google Docs

    + You are expected to code in Google Docs. Since it does not have any IDE, you are expected to type out your code from scratch

    + Type as close to fully functional code as possible. This code should be maintainable and readable by a large database of engineers

    + Code in the latest version of your preferred language and use appropriate language constructs. Take care of variable names and syntax.

    + Do not use Pseudo code or shortcuts, it is not good enough.

    + Always cover for Edge/Boundary cases

+ Tip 6: Positive & Independent Attitude & Being Open to Feedback

    + If you get stuck, stay calm, asking questions can help to reduce the scope of the problem.

    + Aim to solve as much independently as possible, ideally with as few hints as possible.

    + Always take the initiative in the interview, and treat it like a technical discussion. 

    + Listen attentively to the interviewer, and integrate the hints/suggestions by the interviewer to your solution.

### *Interview Preparation Plan (created by Google Software Engineers)*

1. Revise all concepts on data structures & algorithms- you can also use this [gitHub link](https://github.com/jwasham/google-interview-university/blob/master/README.md#google-interview-university) on CS fundamentals that can serve as a checklist while preparing. This BigO cheat sheet <http://bigocheatsheet.com/>  could help you as well!

2. Structured Revision plan on the topics that to cover (Eg. hashtable, hashmaps, trees, arrays, strings, graphs, dynamic programming and more)

    + Practise per category

    + Practice up to a level that you reach competency - Solve the question in 20/40 minutes (for medium and hard problems respectively) and come up with the optimal solutions

3. Practice Problem Identification by picking random problems and practice identifying “Which category does this problem belong to? Backtracking/Dynamic programming? Solution/Algorithmic design?”.

4. Practice coding without an IDE, be familiar with the differences in how you should write code in Google Docs. Do practise coding in Google Docs within a set time frame and getting comfortable talking while coding.

5. In summary: Practise a wide variety of questions, and simulate actual interview conditions! You can also run mock interviews here at pramp.com

### *Frequently asked topics (in no particular order)*

+ Binary search
+ BFS/DFS/Flood fill
+ Tree traversals
+ Hash tables
+ Linked list, stacks, queues, two pointers/sliding window
+ Binary heaps
+ Dynamic programming
+ Union find
+ Ad hoc/string manipulations
+ Other good to know topics: Trie, segment trees/fenwick trees, bitmask
+ Google Interview Style Guides (C++, Python, Java; Javascript)

+ You'll be expected to know and apply: **lists, maps, stacks, priority queues, binary trees, graphs, bags, and sets.**

+ For algorithms you'll want to know **greedy algorithms, divide and conquer, dynamic programming, recursion, and brute force search**.

+ *You'll definitely want to be conversant with big­O notation, time­-space complexity, and real world performance of all of this.*

### *What we are assessing for Data Structures & Algorithms*

+ Can you implement the most optimized data structure and algorithm for the question?

+ Can you explain the tradeoffs between the data structure/solution?

+ Can you explain why you choose a data structure for implementation

+ Can you explain and analyze the time and space complexity correctly

+ Can you translate the algorithm to code well?

### *System Design Tips*

System Design assesses a candidate's ability to combine knowledge, theory, experience and judgement toward solving a real-world engineering problem with significant ambiguity.

Systems Design questions are about learning from your experience and applying those lessons to future projects. We are looking for you to be able to:

+ Clarify the problem - System Design questions are deliberately underspecified, and we expect candidates to understand where the gaps are and ask followup questions, just like in a real project, where you have to probe to find the boundaries of the problem space.

+ Break down a complex problem into parts, and be able to discuss the overall design at both a high level and to do a deep dive into how a component in your system works.  Note you will likely have to dig deeper into the problem initially presented to clarify details and understand resource requirements and limitations.

+ Identify and analyze tradeoffs in your design, understanding what the implications are.  Note that we are more interested in seeing that you understand the implications of the various tradeoffs you make in your design -- we want to see a coherent design rather than evaluating if specific tradeoffs are “correct” or not.

+ Recovering from failure.  Things go wrong in real life.  At large scale they can happen more often.  How do you detect and defend against failures?

+ Avoid answers, which involve "use a standard database and do queries against it;" we're not looking for answers involving off-the-shelf products, rather how do you build from scratch?  [*Talking about why or why not available solutions could or could not be effective does hold value]

    + [Systems design](https://github.com/checkcheckzz/system-design-interview)
    + [Building large-scale distributed systems](http://static.googleusercontent.com/media/research.google.com/en//people/jeff/stanford-295-talk.pdf) ([video version](https://www.youtube.com/watch?v=modXC5IWTJI)) 
    + [The Google File System](https://ai.google/research/pubs/pub51)
    + [Bigtable: A Distributed Storage System for Structured Data](https://ai.google/research/pubs/pub27898)
    + https://backendology.com/2018/09/10/distributed-systems-course-reading-list/

Useful Resources

Videos/Blogs:

Coding Practice:

Free Refresher Courses:

1)  Example Coding/Engineering Interview

2) How to: Prepare for a Google Engineering Interview

3) Interview tips from Google Software Engineers

4) Steve Yegge’s Blog (read me!)

5) Check out this YouTube playlist!

HackerRank


Topcoder


LeetCode


Interviewcake


Kattis


Geeksforgeeks


Pramp - Mock Interview


Interviewing.io


Strategy for algorithmic problem solving - step by step

Intro (https://www.coursera.org/learn/cs-tech-interview/lecture/hYbvm/algorithmic-problem-solving-and-interviews) 

What to do first (https://www.coursera.org/learn/cs-tech-interview/lecture/hAbVU/case-study-introduction)

Starting with a naive solution (https://www.coursera.org/learn/cs-tech-interview/lecture/gs7Tg/case-study-a-first-solution)

Optimizing your solution (https://www.coursera.org/learn/cs-tech-interview/lecture/Qu7hy/case-study-going-deeper)


MIT Open courseware - Introduction to Algorithms

All the best with your preparation! Please let me know if you have any questions.