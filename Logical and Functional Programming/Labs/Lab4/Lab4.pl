% Write a program to generate the list of all subsets of sum S with the elements of a list (S - given).
% Eg: [1,2,3,4,5,6,10] si S=10 => [[1,2,3,4], [1,3,6], [1,4,5], [2,3,5], [4,6], [10]] (not necessary in this order)

% sum(L - list, S - result sum)
% flow model (i, o)

sum([], 0).
sum([H|T], S):-
    sum(T, S1),
    S is S1 + H.

% subset(L - list, R - result list)
% flow model (i, o)

subset([], []).
subset([H|T], [H|T1]):-
    subset(T, T1).
subset([_|T], R):-
    subset(T, R).

% all_subsets(L - list, S - sum, R - result list)
% flow model (i, i, o)

all_subsets(L, S, R):-
    findall(RES, (subset(L, RES), sum(RES, S)), R).


% ! --- TESTING --- !

main():-
    all_subsets([1, 2, 3], 3, [[1, 2], [3]]),
    all_subsets([], 0, [[]]),
    all_subsets([0, 0], 10, []),
    all_subsets([7, 2, 8, 3, 5, 1], 15, [[7, 2, 5, 1], [7, 8], [7, 3, 5], [2, 8, 5]]),
    all_subsets([1, 1, 1, 1], 3, [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]),
    all_subsets([2, 2], 4, [[2, 2]]),
    all_subsets([1], 1, [[1]]),
    all_subsets([10], 100, []).