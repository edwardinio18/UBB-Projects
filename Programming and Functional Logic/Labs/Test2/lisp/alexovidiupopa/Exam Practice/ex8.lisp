(set 'L '(T NIL T))
;(apply 'or L)
; crashes, reason: or is not a function, it is an operator
; solution: make a custom my_or function which evaluates all list params can call it with list(L)

(defun my_or (l)
    (cond 
        ((null l) nil)
        (t (or (car l) (my_or (cdr l))))
    )
)

;(print (apply 'my_or (list L)))

;4) complexity + program for removing every n'th element 

(defun rmv (l i n)
    (cond 
        ((null l) nil)
        ((eq 0 (mod i n)) (rmv (cdr l) (+ 1 i) n))
        (t (cons (car l) (rmv (cdr l) (+ 1 i) n)))
    )
)

;make wrapper ofc
;space complexity is O(n): 
;{ O(0)=0;
;  O(n) = 1 + O(n-1)} => n. if we use append, it's gonna be n^2
;(print (rmv '(1 2 3 4 5) 1 2))

;5) number of sublists having an odd number of nonnumeric atoms on even levels

(defun countNNAtoms(l)
    (cond 
        ((NULL L) 0)
        ((AND (NOT (NUMBERP L)) (ATOM L)) 1)
        ((ATOM L) 0)
        (t (apply #'+ (mapcar #'countNNAtoms l)))
    )
)

(defun getEvenLevels(l level) 
    (cond 
        ((and (evenp level) (atom l)) (list l))
        ((atom l) nil)
        (t (apply #'append (mapcar (lambda (a) (getEvenLevels a (+ 1 level))) l)))
    )
)

;initial level is 0 because it enters the 3rd branch automatically
(defun check(l)
    (cond 
        ((= 1 (mod  (countNNAtoms (getEvenLevels l 0)) 2)) t)
        (t nil)
    )
)

(defun countSublists (l)
    (cond 
        (
            (and (listp l) (check l)) 
            (write l)
            (+ 1 (apply #'+ (mapcar #'countSublists l)))
            
        )
        ((atom l) 0)
        (t (apply #'+ (mapcar #'countSublists l) ))
    )
)

(defun main (l)
    (countSublists l)
)

(print (main '(A (B 2) (1 C 4) (1 (6 F)) (((G) 4) 6))))
