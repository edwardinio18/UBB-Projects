;a) remove all numbers from n to n steps
(defun solve_rec(l i n)
    (cond 
        ((null l) nil)
        ((not (eq 0 (mod i n))) (cons (car l) (solve_rec (cdr l) (+ i 1) n)))
        (t (solve_rec (cdr l) (+ i 1) n ))
    )
)
;should make a wrapper for this but im too lazy, diy
;(print (solve_rec '(1 2 3 4 5) 1 2))

;d) remove all occ of max elem
(defun getMaxRec (l v)
    (cond 
        ((null l) v)
        ((and (numberp (car l)) (> (car l) v) ) (getMaxRec (cdr l) (car l)))
        (t (getMaxRec (cdr l) v))
    )
)

(defun getmax (l)
    (getMaxRec (cdr l) (car l))
)

(defun buildListRec(l m)
    (cond 
        ((null l) nil)
        ((not (eq (car l) m)) (cons (car l) (buildListRec (cdr l) m)))
        (t (buildListRec (cdr l) m))
    )
)

(defun buildList(l)
    (buildListRec l (getmax l))
)

(print (buildList '(0 3 4 5 0 0 5)))