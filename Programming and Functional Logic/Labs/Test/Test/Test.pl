% Write a predicate to compute the sum of two numbers written as a list, without transforming the list in number.

% [1 1 1] [2 3 4] -> [3 4 5]
% [1 1 1 1] [2 3 4] -> [1 3 4 5]
% [1 4 2] [9 9] -> [2 4 1]
% [9 7] [4 5] -> [1 4 2]

% rev(L - list to reverse, R - result list, A - empty list)
% flow model (i, o, i)

rev([], Z, Z).
rev([H|T], Z, A):-
    rev(T, Z, [H|A]).

% sum(L1 - list 1, L2 - list 2, R - result list)
% flow model (i, i, o)

sum(L1, L2, OutL):-
    rev(L1, List1, []),
    rev(L2, List2, []),
    add_lists(List1, List2, 0, List3),
    rev(List3, OutL, []).

% add_lists(L1 - list 1, L2 - list 2, C - carry, R - result list)
% flow model (i, i, i, o)

add_lists([], [], 0, []).
add_lists([], [], 1, [1]).
add_lists([], [H|T], C, [H1|T]):-
    H1 is H + C.
add_lists([H|T], [], C, [H1|T]):-
    H1 is H + C.
add_lists([H|T], [H1|T1], C, [H2|T2]):-
    NH is H1 + H,
    (NH > 10 -> NC is 1,
        H2 is NH + C - 10;
        H2 is NH + C,
        NC is 0),
    add_lists(T, T1, NC, T2),
    !.

% ! --- TESTING --- !

main():-
    sum([1, 1, 1], [2, 3, 4], [3, 4, 5]),
    sum([1, 1, 1, 1], [2, 3, 4], [1, 3, 4, 5]),
    sum([1, 4, 2], [9, 9], [2, 4, 1]),
    sum([9, 7], [4, 5], [1, 4, 2]).