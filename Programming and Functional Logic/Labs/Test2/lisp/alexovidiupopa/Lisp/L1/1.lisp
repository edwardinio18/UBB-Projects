;a) return the nth elem of a list/ nil

(defun nThElem (l i n)
    (cond 
    ((null l)nil)
    ((eq i n) (car l))
    (t (nThElem (cdr l) (+ i 1) n))
    )
)

(defun solve (x n)
    (nThElem x 1 n)
)

;(print (solve '(1 2 3 4 5) 6))
;(print (solve '(1 2 3 4 5) 4))

;b) check if an atom is in a list not necessarily linear
(defun member2 (l x)
    (cond 
        ((null l) nil)
        ((eq (car l) x) t)
        ((listp (car l)) (member2 (car l) x))
        (t (member2 (cdr l) x))
    )
)

;(print (member2 '(1 2 3 (1 2 (4))) 5))


;c) list of all sublists
(defun build (l v)
    (cond 
    ((null l) v)
    ((listp (car l)) (build (car l) (append v (list (car l)))))
    (t (build (cdr l) v))
    )
)

(print (build '(1 2 (3 (4 5) (6 7)) 8 (9 10)) () ))

;d) linear list => set
(defun transform (l v)
    (cond 
        ((null l) v)
        ((not (member2 v (car l)))  (transform (cdr l) (append v (list (car l)))))
        (t (transform (cdr l) v))
    )
)

;(print (transform '(1 1 2 3 4 5 5) ()))