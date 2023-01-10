;preorder traversal of tree of type (2) 

(defun traverse(l)
    (cond 
        ((null (car l)) nil )
        (t
            (append (list (car l)) (traverse (cadr l)) (traverse (caddr l)))            
        )
    )
)


(print (traverse '(1 (2) (3 (5) (4))) ))