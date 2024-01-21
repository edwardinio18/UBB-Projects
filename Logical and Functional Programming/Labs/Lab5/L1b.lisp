; 12. Determine the list of nodes accesed in preorder in a tree of type (2).

; leftSubTree(t1t2...tn) = nil, if t1 is nil or t1 is not a list
;                          leftSubTree(t11), t1 = t11t12

(defun leftSubTree (tree)
    (cond
        (
            (null tree) nil
        )
        (
            (not (listp tree)) nil
        )
        (
            t (car (cdr tree))
        )
    )
)

; rightSubTree(t1t2...tn) = nil, if t1 is nil or t1 is not a list
;                           rightSubTree(t12), t1 = t11t12

(defun rightSubTree (tree)
    (cond
        (
            (null tree) nil
        )
        (
            (not (listp tree)) nil
        )
        (
            t (car (cdr (cdr tree)))
        )
    )
)

; preTrav(t1t2...tn) = nil, if t is nil or t is not a list
;                      leftSubTree(t1) + rightSubTree(t1), otherwise

(defun preTrav (tree)
    (cond
        (
            (null tree) nil
        )
        (
            (not (listp tree)) nil
        )
        (
            (cons (car tree) (append (preTrav (leftSubTree tree)) (preTrav (rightSubTree tree))))
        )
    )
)

(fiveam:test testLeftSubTree
    (fiveam:is (equal '(B (C)) (leftSubTree '(A (B (C)) (D)))))
    (fiveam:is (equal nil (leftSubTree '(A))))
    (fiveam:is (equal nil (leftSubTree '(A () (B)))))
    (fiveam:is (equal '(B (C (E (F))) (D)) (leftSubTree '(A (B (C (E (F))) (D)) ()))))
    (fiveam:is (equal '(B) (leftSubTree '(A (B) ()))))
)

(fiveam:test testRightSubTree
    (fiveam:is (equal nil (rightSubTree '(A (B) ()))))
    (fiveam:is (equal '(C (D (F))) (rightSubTree '(A (B) (C (D (F)))))))
    (fiveam:is (equal nil (rightSubTree '())))
    (fiveam:is (equal '(C (D) (E)) (rightSubTree '(A (B) (C (D) (E))))))
    (fiveam:is (equal '(C (I)) (rightSubTree '(A (B) (C (I))))))
)

(fiveam:test testPreTrav
    (fiveam:is (equal '(\T I G A R A) (preTrav '(\T (I (G) (A (R (A))))))))
    (fiveam:is (equal '(A B D F G C H I X Z) (preTrav '(A (B (D) (F (G))) (C () (H (I (X)) (Z)))))))
    (fiveam:is (equal '(A B C D E F G) (preTrav '(A (B (C)) (D (E) (F (G)))))))
    (fiveam:is (equal nil (preTrav '())))
    (fiveam:is (equal '(L I S P) (preTrav '(L () (I (S () (P)))))))
)