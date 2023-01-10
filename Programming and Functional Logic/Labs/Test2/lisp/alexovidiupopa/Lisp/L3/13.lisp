(defun treeDepth (l)
  (cond
    ((atom l) 0)
    (t (+ 1 (apply #'max (mapcar #'treeDepth l))))
  )
)


(print (treeDepth '(1 2 (3 4 (5 6)) 7)))