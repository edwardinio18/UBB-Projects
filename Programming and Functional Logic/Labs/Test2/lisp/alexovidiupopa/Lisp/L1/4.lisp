;a) sum of two vectors
(defun sum2 (a b )
    (cond 
        ((null a) 0)
        ((null b) 0)
        (t (+ (car a) (car b) (sum2 (cdr a) (cdr b))))
    )
)

(print (sum2 '(1 2 3 4) '(-1 0 3 2)))

;d) max num at superficial level
(defun getmax (l m)
    (cond 
        ((null l) m)
        ((and (numberp (car l)) (> (car l) m)) (getmax (cdr l) (car l)))
        (t (getmax (cdr l) m))
    )
)

(print (getmax '(1 2 100 4 (200)) 0))