;4)remove elem e from all levels
(defun _remove(l e)
    (cond 
        ((null l) nil)
        ((eq (car l) e) (_remove (cdr l) e))
        ((listp (car l)) (cons (_remove (car l) e) (_remove (cdr l) e)))
        (t (cons (car l) (_remove (cdr l) e)))
    )
)

;(print (_remove '(1 (2 (3))) 5))
(print (_remove '(1 (2 (3 5) (5))) 5))

;5) determine the number of sublists at any level where the last atom (at any level) is nonnumeric

(defun getlast (l temp)
    (cond 
        ((null l) temp)
        ((atom (car l)) (getlast (cdr l) (car l)))
        (t (getlast (cdr l) (getlast (car l) temp)))
    )
)

(defun check(l)
    (setq temp (getlast l nil))
    (cond 
        ((numberp temp) nil)
        (t t)
    )
)

(defun solve(l)
    (cond 
        ((atom l) 0)
        ((and (listp l) (not (check l))) (apply #'+(mapcar #'solve l)))
        (t 
            (+ 1 (apply #'+(mapcar #'solve l)))
        )
    )
)

(print (solve '(A (B 2) (1 C 4) (D 1 (6 F)) ((G 4) 6) F)))