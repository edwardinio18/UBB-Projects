(defun f(l)
    (cond 
        ((null l) 0)
        ((> (f (car l)) 2) (+ (car l) (f (cdr l))))
        (t (f (car l)))
    )
)

;(print (f '(1 2 3 )))
;SOLUTION: 
(defun good(l)
    (funcall #'(lambda (temp)
                    (cond 
                        ((null l) 0)
                        ((> temp 2) (+ 2 (car l) (f (cdr l))))
                        (t temp)
                    )
               )
               (f (car L))
    
    )

)
;(print (f '(1 2 3 )))


(defun f(x &rest y)
    (cond 
        ((null y) x)
        (t (append x (mapcar #'car y)))
    )
)

;expected answer: (1 2 3 4 5 7) 
; because when calling f (3 4) (5 6) (7 8), (3 4) basically remains intact because it is "x", and when calling mapcar on car y, 6 and 8 are basically ignored and only 5 and 7 taken.
;(print (append (f '(1 2)) (f '(3 4) '(5 6) '(7 8))))

(defun change(l lvl k)
    (cond 
        ((and (atom l) (= lvl k)) (list 0))
        ((atom l) (list l))
        (t (list (apply #'append (mapcar #'(lambda (a) (change a (+ 1 lvl) k)) l))))
    )
)

;initial lvl is 0 because it is incremented when calling the function for the first time (entering 3rd branch)
;car is needed because of the list before apply, which in the end gives us a list of one element, in which the actual list is contained.
(defun main(l k)
    (car (change l 0 k))
)

(print (main '(a (1 (2 b)) (c (d))) 2))