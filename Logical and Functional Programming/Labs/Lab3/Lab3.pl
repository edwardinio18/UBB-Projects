% 5. a. Substitute all occurrences of an element of a list with all the elements of another list.
% Eg. subst([1,2,1,3,1,4],1,[10,11],X) produces X=[10,11,2,10,11,3,10,11,4].

% subst(L - initial list, E - element, S - list to add, R - result list)
% flow model (i, i, i, o) (i, i, i, i)

% subst(L, _, [], L):-
%     !.
% subst([], _, _, []):-
%     !.
% subst([H|T], E, S, R):-
%     H =:= E,
%     !,
%     append(S, R1, R),
%     subst(T, E, S, R1).
% subst([H|T], E, S, [H|R]):-
%     subst(T, E, S, R).

% % b. For a heterogeneous list, formed from integer numbers and list of numbers,
% % replace in every sublist all occurrences of the first element from sublist it a new given list.
% % Eg.: [1, [4, 1, 4], 3, 6, [7, 10, 1, 3, 9], 5, [1, 1, 1], 7] si [11, 11] =>
% % [1, [11, 11, 1, 11, 11], 3, 6, [11, 11, 10, 1, 3, 9], 5, [11 11 11 11 11 11], 7]

% % Current result: [1, [11, 11, 2, 11, 11], 2]

% % count(L - list, E - element, R - result)
% % flow model (i, i, o) (i, i, i)

% count([], _, 0):-
%     !.
% count([H|T], E, R):-
%     H =:= E,
%     !,
%     count(T, E, R1),
%     R is R1 + 1.
% count([H|T], E, R):-
%     H =\= E,
%     count(T, E, R).

% % app(C - element count, S - list to add, R - result list)
% % flow model (i, i, o) (i, i, i)

% app(_, [], []):-
%     !.
% app(C, _, R):-
%     C =:= 0,
%     R = [],
%     !.
% app(C, S, R):-
%     C1 = C - 1,
%     append(R1, S, R),
%     app(C1, S, R1),
%     !.

% % app(2, [11, 11], []) -> app(1, [11, 11], [11, 11]) -> app(0, [11, 11], [11, 11, 11, 11])

% % replace(L - initial list, S - list to add, R - result list)
% % flow model (i, i, o) (i, i, i)

% % Change: [1, [1, 2, 1], 2] and [11, 11] -> [1, [1, 2, 1], [11, 11, 11, 11], 2]

% list_empty([], 1).
% list_empty([_|_], 0).

% replace(L, [], L):-
%     !.
% replace([], _, []):-
%     !.
% replace([], [], []):-
%     !.
% replace([H|T], S, [H1, H2|R]):-
%     is_list(H),
%     list_empty(H, RES),
%     RES =:= 0,
%     !,
%     H = [E|_],
%     count(H, E, C),
%     app(C, S, R1),
%     H1 = H,
%     H2 = R1,
%     replace(T, S, R).
% replace([H|T], S, [H1, H2|R]):-
%     is_list(H),
%     list_empty(H, RES),
%     RES =:= 1,
%     !,
%     H1 = [],
%     H2 = [],
%     replace(T, S, R).
% replace([H|T], S, [H|R]):-
%     not(is_list(H)),
%     replace(T, S, R).






subst(L, _, [], L):-
    !.
subst([], _, _, []):-
    !.
subst([H|T], E, S, R):-
    H =:= E,
    !,
    append(S, R1, R),
    subst(T, E, S, R1).
subst([H|T], E, S, [H|R]):-
    subst(T, E, S, R).

% b. For a heterogeneous list, formed from integer numbers and list of numbers,
% replace in every sublist all occurrences of the first element from sublist it a new given list.
% Eg.: [1, [4, 1, 4], 3, 6, [7, 10, 1, 3, 9], 5, [1, 1, 1], 7] si [11, 11] =>
% [1, [11, 11, 1, 11, 11], 3, 6, [11, 11, 10, 1, 3, 9], 5, [11 11 11 11 11 11], 7]

% replace(L - initial list, S - list to add, R - result list)
% flow model (i, i, o) (i, i, i)

replace(L, [], L):-
    !.
replace([], _, []):-
    !.
replace([], [], []):-
    !.
replace([H|T], S, [H1|R]):-
    is_list(H),
    !,
    H = [E|_],
    subst(H, E, S, R1),
    H1 = R1,
    replace(T, S, R).
replace([H|T], S, [H|R]):-
    not(is_list(H)),
    replace(T, S, R).


% !-- TESTING --!

testSubst():-
    subst([1, 2, 1, 3, 1, 4], 1, [10, 11], [10, 11, 2, 10, 11, 3, 10, 11, 4]),
    subst([1, 2, 3], 4, [100, 1], [1, 2, 3]),
    subst([], 10, [1, 1, 1, 1], []),
    subst([10, 10, 10, 10, 10], 10, [], []),
    subst([], 1, [], []),
    subst([1, 1, 1, 1, 1], 1, [2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]).

testReplace():-
    replace([1, [4, 1, 4], 3, 6, [7, 10, 1, 3, 9], 5, [1, 1, 1], 7], [11, 11], [1, [11, 11, 1, 11, 11], 3, 6, [11, 11, 10, 1, 3, 9], 5, [11, 11, 11, 11, 11, 11], 7]),
    replace([1, [1, 2, 3, 1, 1], 2, [2, 3, 1, 5], 5, [10]], [69], [1, [69, 2, 3, 69, 69], 2, [69, 3, 1, 5], 5, [69]]),
    replace([[1, 2, 2, 2, 1], 5], [], [[1, 2, 2, 2, 1], 5]),
    replace([], [], []),
    replace([], [1, 2, 3], []),
    replace([1, 2, 3, [1, 2, 3], [1, 2, 3], 1, 2, 3, [1, 2, 3, 1]], [0], [1, 2, 3, [0, 2, 3], [0, 2, 3], 1, 2, 3, [0, 2, 3, 0]]).

testAll():-
    testSubst(),
    testReplace().

main():-
    testAll().