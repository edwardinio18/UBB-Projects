(defun searching (l n)
(cond
	((and (atom l) (equal l n)) 1)
    ((atom l) 0)
	((listp l) (apply #'+ (mapcar #'(lambda(s) (searching s n)) l)))
	)
	)

(defun wrapper(n)
(cond
    ((> n 0) t)
    (T nil)
    )
	)
(print (wrapper(searching  '(1 (2 (3)) (4) (5 (6))) 10)) )



(defun searching (l)
(cond
    ((numberp l) l)
	((atom l) 0)
	((listp l) (apply #'+ (mapcar #'(lambda(s) (searching s)) l)))
	)
	)

(print (searching  '(1 (2 (3)) (4) (() (A))))) 
