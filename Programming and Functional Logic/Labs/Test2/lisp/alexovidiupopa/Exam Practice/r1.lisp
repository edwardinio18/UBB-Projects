(defun F(l)
    (max (car l) (caddr l))
)

(setq F 10)
(setq G 'F)
(print (G '(8 11 2 3 7 9)))


;4) 


;5) nr de subliste pentru care primul atom numeric este nr par

(defun getFirstNumber(l)
    (cond 
        ((null l) nil)
        ((numberp (car l)) (car l))
        (t (getFirstNumber (cdr l)))
    )
)

(defun check (l)
    (setq first (getFirstNumber l))
    (cond 
        ((eq first nil) nil)
        ((oddp first) nil)
        (t t)
    )
)

(defun solve(l)
    (cond 
        ((atom l) 0)
        ((and (listp l) (check l)) (+ 1 (apply #'+ (mapcar #'solve l))))
        (t (apply #'+ (mapcar #'solve l)))
    )
)

(print (solve '(a 3 (b 2) (1 c 4) (d 2 (6 f)) ((g 4) 6))))