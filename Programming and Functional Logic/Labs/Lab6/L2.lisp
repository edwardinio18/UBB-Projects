; 16. Write a function using map functions that produces the linear list of all atoms of a given list,
; from all levatms, and written in the same order.
; E.g.: (((A B) C) (D E)) --> (A B C D E)

; ((A B) C (D (E (A VB C))))
; ((A B) C) (D E) -> ((A B C) (D E))

; mathematical model
; flatten(l1l2...ln) = nil, if l = nil
;                      l, if l is an atom
;                      list(flatten(l1) U flatten(l2) U ... U flatten(ln)), if l is a list

; write a function to add each sublist greater than 1 level deep to the superficial level of the list

(defun change (l lvl)
    (cond
        (
            (null l) nil
        )
        (
            (atom l) l
        )
        (
            (and (> lvl 1) (listp l)) (mapcan #'(lambda (el) (change el (+ lvl 1))) l)
        )
        (
            (and (<= lvl 1) (listp l)) (mapcar #'(lambda (el) (change el (+ lvl 1))) l)
        )
    )
)

(defun mainChange (l)
    (change l 0)
)

(defun flatten (l)
    (cond
        (
            (null l) nil
        )
        (
            (atom l) (list l)
        )
        (
            (listp l) (mapcan #'flatten l)
        )
    )
)

(defun mainFlatten (l)
    (flatten l)
)


; ! --- UNIT TESTING --- !

(fiveam:test testFlatten
    (fiveam:is (equal '(A B C D E) (mainFlatten '(((A B) C) (D E)))))
    (fiveam:is (equal '(A B C D E F G H I) (mainflatten '(((A B) C) (D E (F (G) H)) I))))
    (fiveam:is (equal nil (mainFlatten '((((())))))))
    (fiveam:is (equal '(\T I G A R A) (mainflatten '(\T (((((I))))) G (A (R (A)))))))
    (fiveam:is (equal '(A A A A A B C D E F G G G PQ W) (mainflatten '(A A A A A (B (C D (E F G G G) PQ (W)))))))
)