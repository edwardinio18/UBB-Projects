/*
    count(L=l1,l2,...,ln, e) = {
        0, if n = 0
        1 + count(L=l2,...,ln, e), if l1 = e
        count(L=l2,...,ln, e), otherwise
    }

    is_set(L=l1,l2,...,ln) = {
        true, if L == 0
        false, if count(L=l1,l2...,ln, l1) > 1
        isSet(L=l2...ln), otherwise
    }

    remove(L=l1,l2,...,ln, e, c) = {
        [], if L == 0 
        [l1] + remove(L=l2,...,ln, e, c + 1) , if l1 = e and c < 3
        remove(L=l2...ln, e, c), otherwise
    }
*/

% count(L - list, E - element, R - result)
% flow model: (i, i, o)

count([], _, 0).
count([H|T], E, R):-
    H =:= E,
    !,
    count(T, E, R1),
    R is R1 + 1.
count(_|T, E, R):-
    count(T, E, R).

find([E|_], R):-
    R =:= E,
    !.
find([_|T], R):-
    find(T, R).

% is_set(L - list)
% flow model: (i)

is_set([]).
is_set([H|T]):-
    R is find([H|T], H),
    \+R,
    is_set(T).

% remove(L - list, E - element, C - counter, R - result)
% flow model: (i, i, i, o)

remove([], _, _, []).
remove([H|T], C, E, R1) :-
    C < 3,
    H =:= E,
    C1 is C + 1,
    remove(T, C1, E, R1).
remove([H|T], C, E, [H|R1]) :-
    remove(T, C, E, R1).

testSet():-
    is_set([1, 2, 3, 4]),
    is_set([]),
    \+(is_set([1, 2, 3, 4, 3])).

testRemove():-
    remove([1, 2, 1, 2, 1], 0, 1, [2, 2]),
    remove([1, 2, 1, 1, 3, 1, 2, 1], 0, 1, [2, 3, 1, 2, 1]),
    remove([], 0, 1, []),
    remove([1, 1], 0, 1, []).