;inorder for tree (1)

(defun inorder (node children list v)
    (cond 
        ((null list) v)
        ((= 0 children) )
        ((= 1 children) (inorder (car list) (cadr list) (cddr list) (append v (list (node)))))
        (t 
            (inorder (car list) ())
        )
    )
)

(defun solve(l)
    ((inorder (car l) (cadr l) (caddr l) ()))
)