---
title: "[algo] timeline algorithm"
keywords: ["algo"]
description: 
date: 2023-11-10T03:10:09+08:00
tags: ["algo"]
draft: false
Categories: "algorithm"
author: "Rain Hu"
showToc: true
TocOpen: true
math: true
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

```Cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    string shortestCommonSupersequence(string a, string b) {
        int m = a.size();
        int n = b.size();
        vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0) continue;
                if (a[i-1] == b[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }

        int i = m;
        int j = n;
        string res;

        while (i > 0 && j > 0) {
            if (a[i-1] == b[j-1]) {
                res += a[i-1];
                --i;
                --j;
            } else {
                if (dp[i-1][j] < dp[i][j-1]) {
                    res += b[--j];
                } else {
                    res += a[--i];
                }
            }
        }
        while (i > 0) res += a[--i];
        while (j > 0) res += b[--j];

        reverse(res.begin(), res.end());

        return res;
    }
    string shortestCommonSupersequencePlus(vector<string>& strs) {
        string res = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            res = shortestCommonSupersequence(res, strs[i]);
        }
        return res;
    }
    string trans(string& a, string& pattern) {
        int i = 0;
        int j = 0;
        int m = a.size();
        int n = pattern.size();
        string res;
        while (i < m && j < n) {
            if (a[i] != pattern[j]) {
                res.push_back(' ');
                j++;
            } else {
                res.push_back(a[i]);
                i++;
                j++;
            }
        }
        return res;
    }
};


int main() {
    int n;
    vector<string> strs = {
        "ABCDEH",
        "ACDEFBH",
        "ADEHG"
    };
    Solution* sol = new Solution();
    string res = sol->shortestCommonSupersequencePlus(strs);
    cout << res << endl;
    cout << sol->trans(strs[0], res) << endl;
    cout << sol->trans(strs[1], res) << endl;
    cout << sol->trans(strs[2], res) << endl;

    return 0;
}
```

+ 結果
```Cpp
input:

ABCDEH
ACDEFBH
ADEHG
=========
output:

ABCDEFBHG
ABCDE  H
A CDEFBH
A  DE  HG
```