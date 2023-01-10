;product of numeric atoms at any lvl
;using MAP functions
(defun prod (l)
    (cond 
        ((numberp l) l)
        ((listp l) (apply #'*(mapcar #'prod l)))
        (t 1)
    )
)

(print (prod '(1 2 3 A 4 C (1 2 (-1 (10 ()))))))