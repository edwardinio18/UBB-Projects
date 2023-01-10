;Return the level of a node in a tree of type 1.
;Note: if the node doesn't exist, the return value will be nil.

(defun explore (x node level children l)
        (cond
            ((eq x node) level)
            ((null l) nil)
            ((= children 0) l)
            (t 
                (setq new (explore x (car l) (+ level 1) (cadr l) (cddr l)))
                (cond 
                    ((listp new) (explore x node level (- children 1) new))
                    (t new)
                )
            )
        )
)

(defun solve (x l)
    (explore x (car l) 0 (cadr l) (cddr l))  
)
;(print (solve 'A (list 'A 2 'B 2 'D 0 'E 2 'F 1 'H 1 'I 0 'G 0 'C 2 'J 0 'K 1 'L 0)))
;(print (solve 'I (list 'A 2 'B 2 'D 0 'E 2 'F 1 'H 1 'I 0 'G 0 'C 2 'J 0 'K 1 'L 0)))
;(print (solve 'E (list 'A 2 'B 0 'C 2 'D 0 'E 0)))
;(print (solve 'F (list 'A 2 'B 0 'C 2 'D 1 'F 0 'E 0)))


(print (solve 'A(list 'A 2 'B 2 'C 2 'E 0 'F 1 'G 0 'D 1 'H 2 'I 0 'J 2 'K 0 'L 0 'M 2 'N 0 'O 2 'P 0 'Q 2 'R 0 'S 1 'T 0)))
(print (solve 'B(list 'A 2 'B 2 'C 2 'E 0 'F 1 'G 0 'D 1 'H 2 'I 0 'J 2 'K 0 'L 0 'M 2 'N 0 'O 2 'P 0 'Q 2 'R 0 'S 1 'T 0)))
(print (solve 'N(list 'A 2 'B 2 'C 2 'E 0 'F 1 'G 0 'D 1 'H 2 'I 0 'J 2 'K 0 'L 0 'M 2 'N 0 'O 2 'P 0 'Q 2 'R 0 'S 1 'T 0)))
(print (solve 'F(list 'A 2 'B 2 'C 2 'E 0 'F 1 'G 0 'D 1 'H 2 'I 0 'J 2 'K 0 'L 0 'M 2 'N 0 'O 2 'P 0 'Q 2 'R 0 'S 1 'T 0)))
(print (solve 'R(list 'A 2 'B 2 'C 2 'E 0 'F 1 'G 0 'D 1 'H 2 'I 0 'J 2 'K 0 'L 0 'M 2 'N 0 'O 2 'P 0 'Q 2 'R 0 'S 1 'T 0)))
(print (solve 'T(list 'A 2 'B 2 'C 2 'E 0 'F 1 'G 0 'D 1 'H 2 'I 0 'J 2 'K 0 'L 0 'M 2 'N 0 'O 2 'P 0 'Q 2 'R 0 'S 1 'T 0)))