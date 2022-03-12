---
title: "[Java] List of list of something equality"
date: 2022-02-18T08:59:45+08:00
tags: ["Java", "Programming"]
Categories: programming     # Programming, Create, Cover, Life, Job, Leetcode, Notes
description: "Common Test methodology in Leetcode"
author: "Rain Hu"           # Rain Hu, 陣雨, intervalrain
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
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
# List of Generics equality

## Case
In [leetcode no. 39 Combination Sum](https://leetcode.com/problems/combination-sum/) gives
> Given an array of **distinct** integers `candidates` and a target integer `target`, return a *list* of all **unique combinations** of `candidates` *where the chosen numbers sum to target*. You may return the combinations in **any order**.
> 
> The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
>
> It is **guaranteed** that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.
> 
> **Example**
>
> **Input**: candidates = [2,3,6,7], target = 7
>
> **Output**: [[2,2,3],[7]]
>
> **Explanation**
>
> 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be use mutiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.


## List Equality
Consider the following case:
```Java
List<Integer> a = Arrays.asList(1,2,3,4);
List<Integer> b = Arrays.asList(4,3,2,1);
List<Integer> c = Arrays.asList(4,4,3,2,1);
```
If we apply `containsAll` methods to test List equality in any order, it might work. But it might not test size of List, so it might go wrong when there is repeated items.
```Java
System.out.println(b.containsAll(a))  // true
System.out.println(c.containsAll(a))  // true
```
How about applying `equals` methods after sorting the List?
```Java
// apply sort to all to-be-check items.
Collections.sort(a);
Collections.sort(b);
Collections.sort(c);

System.out.println(a.equals(b)); // true
System.out.println(a.equals(c)); // false
```
Luckily, List can easily to test elements equality rathan than strict equality of **the same object**.

So, We can see if we want to test List Equality in any order, we can just simply sort List, and apply `a.equals(b)`.
## List of List Equality
But in case leetcode no. 39 Combination Sum, list of list of Integer in any order is considered acceptable answer. How do we test list of list of Integer equality?
```Java
class Solution{
    public List<List<Integer>> combinationSum(int[] candidates, int target){..}
    
    @Test
    public void test(){
        Solution sol = new Solution();
        expected = List.of(List.of(2,2,3), List.of(7)) // [[2,2,3],[7]]
        actual = sol.combinationSum(new int[]{2,3,6,7}
        Collections.sort(expected);  // fail
        Collections.sort(actual);    // fail
        assertEquals(expected, acutal)
    }
}
```
The code will fail, and the description shows below.
> The method sort(List<T>) in the type Collections is not applicable for the arguments (List<List<Integer>>)Java(67108979)

Thus, we have to turns List of Integers in the List into some other type like String, by using `toString()`. So, we can do like this: 
```Java
public boolean equalsAnyOrder(List<List<Integer>> expected, List<List<Integer>> actual){
    // First we have to check size of list equaltiy
    if (expected == null && actual == null) return false;
    if ((expected == null && actual != null) || (expected != null && actual == null) || expected.size() != actual.size()) return false;

    // Create List of string to turn List of Integer into strings.
    List<String> c = new ArrayList<>();
    List<String> d = new ArrayList<>();
    for (int i = 0; i < expected.size(); i++){
        c.add(expected.get(i).toString());
        d.add(actual.get(i).toString());
    }

    // Sort List of strings
    Collections.sort(c);
    Collections.sort(d);
    
    // Apply simple list equaltiy (We have known List.equals() just test equality of elements in order.)
    return c.equals(d);
}

```

## More materials
+ [Leetcode no.39 Solution](https://github.com/intervalrain/leetcode/blob/master/src/main/java/com/rainhu/n39_CombinationSum.java)
+ [Test List of List Equality Implementation](https://github.com/intervalrain/leetcode/blob/master/src/main/java/com/rainhu/DioUtility/ListTest.java)
+ [Test cases for no.39 by Junit](https://github.com/intervalrain/leetcode/blob/master/src/test/java/com/rainhu/n39_CombinationSumTest.java)