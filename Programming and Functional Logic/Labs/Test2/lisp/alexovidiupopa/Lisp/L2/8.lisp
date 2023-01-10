;inorder traversal of tree of type (2) 

(defun traverse(l)
    (cond 
        ((null (car l)) nil )
        (t
            (append (traverse (cadr l)) (list (car l)) (traverse (caddr l)))
        )
    )
)


(print (traverse '(1 (2) (3 (4) (5))) ))