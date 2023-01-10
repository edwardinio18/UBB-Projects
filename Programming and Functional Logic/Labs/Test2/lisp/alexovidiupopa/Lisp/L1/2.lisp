;a) dot product of 2 vectors

(defun dotproduct (a b)
    (cond
        ((and (null a) (null b)) 0)
        (t (+ (* (car a) (car b)) (dotproduct (cdr a) (cdr b))))
    )
)

;(print (dotproduct '(1 2 3) '(4 5 6)))


;b) depth of a list
(defun max2 (a b)
    (cond 
        ((> a b) a)
        (t b)
    )
)

(defun depth (a lvl) 
    (cond 
        ((null a) lvl)
        ((listp (car a)) (max2 (depth (car a) (+ 1 lvl)) (depth (cdr a) lvl)))
        (t (depth (cdr a) lvl))
    )
)

;(print (depth '(1 2 3 (1 2 (3)) (4 5)) 1))

;c) sort without keeping doubles
(defun merge2 (a b)
    (cond 
        ((and (null a) (null b)) nil)
        ((null a) b)
        ((null b) a)
        ((> (car a) (car b)) (cons (car b) (merge2 a (cdr b))))
        ((< (car a) (car b)) (cons (car a) (merge2 (cdr a) b)))
        (t (cons (car a) (merge2 (cdr a) (cdr b))))
    )
)
;(print (merge2 '(4 8 9 10) '(4 5 6 7 11)))

(defun insertOk (l e)
    (cond 
        ((null l) (list e))
        ((equal (car l) e) l)
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

;d)intersection of two sets

(defun search2 (x l)
(cond 
    ((null l) 0)
    ((eq x (car l)) 1)
    (t (search2 x (cdr l)))
)
)


(defun intersection2 (a b)
(cond 
    ((or (null a) (null b)) nil)
    ((eq 1 (search2 (car a) b)) (cons (car a) (intersection2 (cdr a) b)))
    (t (intersection2 (cdr a) b))
)
)

(print (intersection2 '(1 2 3 4 5) '(1 5 6 7)))