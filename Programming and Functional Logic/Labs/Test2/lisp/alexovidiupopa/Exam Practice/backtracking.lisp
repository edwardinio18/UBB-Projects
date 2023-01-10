(defun perm(l)
    (cond 
        ((null (cdr l)) (list l))
        (t (mapcan #'(lambda (e) 
                            (mapcar #'(lambda (p) (cons e p)) 
                            (perm (remove e L)))) 
                      l))
    )
)

;(print (perm '(1 2 3)))

(defun subm (l)
    (cond 
        ((null l) (list nil))
        (t (
            (lambda (s) 
                (append s (mapcar #'(lambda (sb) (cons (car l) sb)) s))    
            )
            (subm (cdr l))
            )
        )
    )
)

(print (subm '(1 2 3)))