;(1)->(2)

(defun _convert (l stack)
	(cond
		((null l) (car stack))

		((and (numberp (car l)) (= (car l) 0)) (_convert (cons (list (cadr l)) (cddr l)) stack))
		((and (numberp (car l)) (= (car l) 1)) (_convert (cons (list (car stack) (cadr l)) (cddr l)) (cdr stack)))
		((and (numberp (car l)) (= (car l) 2)) (_convert (cons (list (cadr stack) (car stack) (cadr l)) (cddr l))  (cddr stack)))
		(T (_convert (cdr l) (cons (car l) stack)))
	)
)

; convert(l) => converted list
; convert(l1..ln) = reverse(convert(reverse(l), nil)))
(defun convert (l)
	(reverse(_convert (reverse l) nil))
)

(print (convert '(A 0)))
; => '(A)
(print (convert '(A 1 B 0)))
; => '(A (B))
(print (convert '(A 2 B 1 C 2 D 0 E 0 F 1 G 0)))
(print (convert '(A 2 B 0 C 2 D 0 E 0)))
; => '(A (B) (C (D) (E)))