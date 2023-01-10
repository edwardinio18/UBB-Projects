(defun replaceNode (l old new)
    (cond 
        ((and (atom l) (eq l old)) new)
        ((atom l) l)
        ((listp l) (mapcar #'(lambda (a) (replaceNode a old new)) l)  )
        
    )
)

(print (replaceNode '(1 (2 (3)) (4) (5 (6))) 2 10))