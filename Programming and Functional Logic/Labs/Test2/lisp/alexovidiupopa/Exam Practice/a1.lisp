;i.1) 
(defun Fct (f L)
    (cond 
        ((null l) nil)
        ((funcall f (car l)) (cons (funcall f (car l)) (Fct f (cdr l))))
        (t nil)
    )
)

(defun f(x)
    (write x)
    (list x)
)

;(print (Fct 'f '(1 2 3)))

(defun redefine(f l)
    (funcall #' (lambda (x)                    
                        (cond 
                            ((null l) nil)
                            (x (cons x (Fct f (cdr l))))
                            (t nil)
                        )                   
                )
                (funcall f (car l))
    )
)

;(print (redefine 'f '(1 2 3)))

;i.3) 
(defun g(l) (list (car l) (car l)))
(setq q 'g)
(setq p q)
(print (funcall p '(a b c)))
;(A A)


;iii) replace all nodes from the odd levels in a n-ary tree with a given value e

(defun repl (node lvl e)
    (cond 
        ((and (atom node) (oddp lvl)) (list e))
        ((atom node) (list node))
        (t (list (apply #'append (mapcar #' (lambda (a) (repl a (+ 1 lvl) e)) node))))
    )
)

; since root is on level 0, we have to call with -1 because it first gets incremented on the 3rd branch and yields 0. if we call with 0, than the root would be considered on lvl 1, which would contradict the problem statement.
(defun main(tree e)
    (car (repl tree -1 e))
)

(print (main '(a (b (g)) (c (d (e)) (f))) 'h))