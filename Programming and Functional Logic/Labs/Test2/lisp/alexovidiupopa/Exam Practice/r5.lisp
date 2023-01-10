;5)nr of sublists having the max numeric element an even number

(defun getmax (l)
	(cond
		((numberp l) l)
        ((atom l) 0)
		((listp l) (apply 'max (mapcar 'getmax l)))
	)
)


(defun countsublists(l)
    (cond
        ((atom l) 0)
        ((and (listp l) (evenp (getmax l))) (+ 1 (apply #'+ (mapcar #'countsublists l))))
        (t (apply #'+ (mapcar #'countsublists l)))
    )
)

(print (countsublists '(a (b 1) (1 c 4) 7 (d 1 (6 f)) ((g 4) 6))))