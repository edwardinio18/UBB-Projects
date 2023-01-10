;a) union of two sets
(defun contains (l x)
    (cond 
        ((null l) 0)
        ((eq (car l) x) 1)
        (t (contains (cdr l) x))
    )
)

(defun unionRec (l v)
    (cond 
        ((null l) v)
        ((= (contains v (car l)) 0) (unionRec (cdr l) (append v (list (car l)))))
        (t (unionRec (cdr l) v))
    )
)

(defun union2 (a b)
    (unionRec b a)
)

;(print (union2 '(1 2 3) '(1 2 3 4)))

;c)sort with keeping doubles
(defun insertOk (l e)
    (cond 
        ((null l) (list e))
        ((< e (car l)) (cons e l))
        (t (cons (car l) (insertOk (cdr l) e)))
    )
)

(defun sort2 (l)
(cond 
    ((null l) nil)
    (t (insertOk (sort2 (cdr l)) (car l)))
)
)
;(print (sort2 '(1 3 3 2 4 5 10 5)))


;d) list containing positions of the min elem

(defun getminRec (l v)
    (cond 
        ((null l) v)
        ((and (numberp (car l)) (< (car l) v) ) (getminRec (cdr l) (car l)))
        (t (getminRec (cdr l) v))
    )
)

(defun getmin (l)
    (getminRec (cdr l) (car l))
)

(defun buildListRec(l i m)
    (cond 
        ((null l) nil)
        ((eq (car l) m) (cons i (buildListRec (cdr l) (+ i 1) m)))
        (t (buildListRec (cdr l) (+ i 1) m))
    )
)

(defun buildList(l)
    (buildListRec l 1 (getmin l))
)

(print (buildList '(0 3 4 5 0 0)))