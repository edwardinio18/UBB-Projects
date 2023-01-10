;row 4
;gcd off the odd nos from even levels

(defun _gcd(a b)
    (cond 
    ((= 0 a) b)
    ((= 0 b) a)
    ((> b a) (_gcd b a))
    (t (_gcd b (mod a b)))
    )
)

(defun __gcd(l)
    (cond 
        ((null l) 0)
        (t (_gcd (car l) (__gcd (cdr l))))
    )
)

(defun getOddElemsEvenLevels(l lvl)
    (cond 
        ((and (numberp l) (= 0 (mod lvl 2))) (list l))
        ((atom l) nil)
        (t (apply #'append (mapcar #'(lambda (a) (getOddElemsEvenLevels a (+ 1 lvl))) l)))
    )
)

(defun main (l)
    (__gcd (getOddElemsEvenLevels l 0))
)

;(print (main '(a b 12 (9 d (a f (75 b) d (45 f) 1) 15) c 9)))

;row 7
;how many sublists contain an equal number of numerical and non numerical atoms on odd levels

(defun getNumsOddLevels(l lvl)
    (cond 
        ((and (numberp l) (= 1 (mod lvl 2))) (list l))
        ((atom l) nil)
        (t (apply #'append (mapcar #'(lambda (a) (getNumsOddLevels a (+ 1 lvl))) l)))
    )
)

(defun getAllOddLevels(l lvl)
    (cond 
        ((and (atom l) (= 1 (mod lvl 2))) (list l))
        (t (apply #'append (mapcar #'(lambda (a) (getNonNumsOddLevels a (+ 1 lvl))) l)))
    )
)

(defun check(l lvl)
    (cond 
        ((eq (length (getNumsOddLevels l (- lvl 1))) (- (length (getAllOddLevels l (- lvl 1))) (length (getNumsOddLevels l (- lvl 1))))) t)
        (t nil)
    )
)

(defun countThem(l lvl)
    (cond 
    ((atom l) 0)
    ((and (listp l) (check l lvl)) (+ 1 (apply #'+(mapcar #' (lambda (a) (countThem a (+ 1 lvl))) l))))
    (t  (apply #'+(mapcar #' (lambda (a) (countThem a (+ 1 lvl))) l)))
    )
)

(defun main2(l)
    (countThem l 0)
)

;(print (getNumsOddLevels '(a b 12 (5 d (a f (b) d (5 f) 1) 5) c 9 (f 4 (d) 9 (f (h 7) k) (p 4)) x) 0))
;(print (getNonNumsOddLevels '(a b 12 (5 d (a f (b) d (5 f) 1) 5) c 9 (f 4 (d) 9 (f (h 7) k) (p 4)) x) 0))

;(print (main2 '(a b 12 (5 d (a f (b) d (5 f) 1) 5) c 9 (f 4 (d) 9 (f (h 7) k) (p 4)) x)))
