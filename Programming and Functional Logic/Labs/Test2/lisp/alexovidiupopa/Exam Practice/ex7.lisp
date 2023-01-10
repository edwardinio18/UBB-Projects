;4) give 2 implementations for replacing all even numerical values in a nonlinear list with their natural successor

;ok, so the first one will be done using map
(defun replace2 (l)
    (cond 
        ((numberp l) (+ 1 l))
        ((listp l) (apply #'append (list (mapcar #'replace2 l))))
        (t l)
    )
)

;(print (replace2 '(1 A B (3 C (4)))))

;the second one will use the same principle but without map 
(defun replace3 (l)
    (cond 
        ((null l) nil)
        ((numberp (car l)) (cons (+ 1 (car l)) (replace3 (cdr l))))
        ((listp (car l)) (cons (replace3 (car l)) (replace3 (cdr l)))) 
        (t (cons (car l) (replace3 (cdr l))))
    )
)


;(print (replace3 '(1 A B (3 C (4)))))

;5) number of sublists where the maximal numeric atom on all odd levels is even

(defun getMax (l m)
    (cond 
        ((null l) m)
        ((> (car l) m) (getMax (cdr l) (car l)))
        (t (getMax (cdr l) m))
    )
)

(defun getNumbersOnOddLvls(l lvl)
    (cond 
        ((and (numberp l) (= 0 (mod lvl 2))) (list l))
        ((atom l) nil)
        ((listp l) (apply #'append (mapcar #'(lambda (a) (getNumbersOnOddLvls a (+ 1 lvl))) l)))
    )
)

(defun check (l level)
    (cond 
        ((oddp (getmax (getNumbersOnOddLvls l level) -1)) nil)
        (t t)
    )
)

(defun countsublists(l lvl)
    (cond 
    ((atom l) 0)
    ((and (listp l) (check l lvl)) (+ 1 (apply #'+(mapcar #' (lambda (a) (countsublists a (+ 1 lvl))) l))))
    (t (apply #'+(mapcar #' (lambda (a) (countsublists a (+ 1 lvl))) l)))
    )
)

(defun main(l)
    (countsublists l 0)
)

(print (main '(A (B 2) (1 C 4) (1 (6 F)) (((G) 4) 6))))