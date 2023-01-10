;i) 1. 
(defun f(l1 l2)
    (append (f (car l1) l2)
        (cond 
            ((null l1) (cdr l2))
            (t (list (f (car l1) l2) (car l2)))
        )
    )
)

(defun good(l1 l2)
    (funcall #'(lambda (temp) 
                    (append temp 
                        (cond 
                            ((null l1) (cdr l2))
                            (t (list temp (car l2)))
                        )
                    )                
               )
            (good (car l1) l2)
    )
)
;(print (good '(1 2) '(2 3)))
;i)3. 
(defun g(l) 
    (write l)
    (mapcon #'list l)
)

;(print (apply #'append (mapcon #'g '(1 2)))) 
;outputs (1 2 2 2) 
;reason: 
;at the apply mapcon, first call is g (1 2) => in g (1 2) => a list of (1 2) is initially made, and then 2 is added because of the cdr call of mapcon. cddr is null so return 
;second call is g(2) => in g(2) a list of (2) is made and the cdr is null so return
;appended together => (1 2 2 2)

;ii) remove all numeric atoms divisibile with 3 from all lvls
(defun rmv (l)
    (cond 
        ((and (numberp l) (eq 0 (mod l 3))) nil)
        ((atom l) (list l))
        (t (list (apply #'append (mapcar #'rmv l))))
    )
)

(defun main(l)
    (car (rmv l))
)

(print (main '(1 (2 A (3 A)) (6)))
)
(print (main '(1 (2 (C))))
)