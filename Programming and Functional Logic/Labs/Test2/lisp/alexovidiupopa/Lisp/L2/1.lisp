(defun dfs(node cnt level m_list search v)
    (write node)
    ;(write level)
        (cond
        ((eq node search) m_list)
        ((null m_list)
            v
        )
        ((= cnt 0)
            m_list)
        (T
            (setq son (dfs (car m_list) (cadr m_list) (+ level 1) (cddr m_list) search v) )
            (dfs node (- cnt 1) level son search v))
    )
)

(defun dfsw (l)
    (dfs (car l) (cadr l) 0 (cddr l) 'C ())
)
(dfsw '(A 2 B 0 C 2 D 0 E 0))