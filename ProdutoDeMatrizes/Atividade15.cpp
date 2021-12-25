#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <climits>
 
using namespace std;
 
pair<int,pair<int,int>> min_cost(vector<pair<set<int>,pair<int,int>>> matrizes) {
    int cost = 0;
    int minCost = INT_MAX;
    int empCost = INT_MAX;
    pair<int,pair<int,int>> min;
    set<int>::iterator itBegin;
    set<int>::reverse_iterator itRBegin;
 
    for(int i = 0; i < matrizes.size()-1; i++) {
        cost = matrizes[i].second.first*matrizes[i].second.second*matrizes[i+1].second.second;
        if(cost < minCost || (cost == minCost && matrizes[i].second.first*matrizes[i+1].second.second < empCost)) {
            minCost = cost;
            empCost = matrizes[i].second.first*matrizes[i+1].second.second;
            itBegin = matrizes[i].first.begin();
            min.second.first = *itBegin;
            itRBegin = matrizes[i+1].first.rbegin();
            min.second.second = *itRBegin;
            min.first = i;
        }
    }
 
    return min;
}
 
int main() {
    int n = 0, a = 0, b = 0;
    pair<int,pair<int,int>> min;
    vector<pair<set<int>,pair<int,int>>> matrizes;
    set<int> matriz;
    string ans = "M1";
 
    cin >> n;
 
    for(int i = 1; i < n; i++) {
        ans += "*M";
        ans += to_string(i+1);
    }
 
    cin >> a;
    for(int i = 0; i < n; i++) {
        cin >> b;
        matriz.insert(i+1);
        matrizes.push_back(make_pair(matriz,make_pair(a,b)));
        matriz.clear();
        a = b;
    }
 
    while(matrizes.size()>2) {
        min = min_cost(matrizes);
        ans.insert(ans.find(to_string(min.second.first))-1,"(");
        ans.insert(ans.find(to_string(min.second.second))+1,")");
        matrizes[min.second.second-1].second.first = matrizes[min.second.first-1].second.first;
        matriz = matrizes[min.first].first;
        matrizes.erase(matrizes.begin()+min.first);
        matrizes[min.first].first.insert(matriz.begin(), matriz.end());
    }
 
    cout << ans << endl;
 
    return 0;
}
