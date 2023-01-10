;Write a function that returns the maximum of numeric atoms in a list,at any level

(defun getmax (l)
	(cond
		((numberp l) l)
		((listp l) (apply 'max (mapcar 'getmax l)))
	)
)
(print (getmax '(1 2 B 3 (-1 A (100))) 0))