; a. A linear list is given. Eliminate from the list all elements from N to N steps, N-given.
; example: list = (1 2 3 4 5 6), N = 2; result = (1 3 5)

; remN(l1l2...ln, n, p) = [], if n = 0
;                         {l1} U remN(l2...ln), if p mod n != 0
;                         remN(l2...ln), otherwise

(defun remN (l n p)
	(cond
		(
			(null l) nil
		)
		(
			(and (/= p 0) (/= (mod p n) 0)(cons (car l) (remN (cdr l) n (+ p 1))))
		)
		(
			t (remN (cdr l) n (+ p 1))
		)
	)
)

(defun mainRemN (l n)
	(remN l n 1)
)


; b) Write a function to test if a linear list of integer numbers has a "valley" aspect
; (a list has a valley aspect if the items decrease to a certain point and then increase.
; Eg. 10 8 6 17 19 20). A list must have at least 3 elements to fulfill this condition.

; valley(l1l2...ln, decreasing) = 
; = nil (false), if n = 1 and decreasing = true
; = true , if n = 1 and decreasing = false
; = nil (false) , if l1 > l2 and decreasing = false
; = valley(l2...ln, false), if l1 < l2 and decreasing = true
; = valley(l2...ln, decreasing), otherwise

(defun valley (l decreasing)
	(cond
		(
			(and (= (length l) 1) decreasing) nil
		)
		(
			(and (= (length l) 1) (not decreasing)) t
		)
		(
			(and (> (car l) (cadr l)) (not decreasing)) nil
		)
		(
			(and (< (car l) (cadr l)) decreasing) (valley (cdr l) nil)
		)
		(
			t (valley (cdr l) decreasing)
		)
	)
)

(defun mainValley (l)
	(cond
		(
			(null l) nil
		)
    	(
			(null (cadr l)) nil
		)
    	(
			(null (caddr l)) nil
		)
    	(
			(< (car l) (cadr l)) nil
		)
    	(
			t (valley l T)
		)
	)
)



; c) Build a function that returns the minimum numeric atom from a list, at any level.

; myMin(a, b) = 
; = nil , if a is not a number and b is not a number
; = a , if b is not a numbe
; = b , if a is not a number
; = a , if a < b
; = b , otherwise

(defun myMin (a b)
	(cond
		(
			(and (not (numberp a)) (not (numberp b))) nil
		)
		(
			(not (numberp a)) b
		)
		(
			(not (numberp b)) a
		)
		(
			(< a b) a
		)
		(
			t b
		)
	)
)


; findMin(l1l2...ln) = 
; = l1 , if n = 1 and l1 is an atom
; = myMin(findMin(l1), findMin(l2...ln)) , if l1 is a list
; = myMin(l1, findMin(l2...ln)) , otherwise


(defun findMin (l)
	(cond
    	(
			(and (null (cdr l)) (atom (car l))) (car l)
		)
    	(
			(listp (car l)) (myMin (findMin (car l)) (findMin (cdr l)))
		)
    	(
			t (myMin (car l) (findMin (cdr l)))
		)
	)
)

(defun mainMinNum (l)
	(findMin l)
)

; d original) Write a function to remove all occurrences of the maximum number from a linear list

; deleteMax(l1l2...ln, max) =
; = [], if n = 0
; = {l1} U deleteMax(l2...ln), if l1 != max
; = deleteMax(l2...ln), otherwise

(defun maxElem1 (l)
	(cond
		(
			(null l) nil
		)
		(
			(null (cdr l)) (car l)
		)
		(
			(> (car l) (maxElem1 (cdr l))) (car l)
		)
		(
			t (maxElem1 (cdr l))
		)
	)
)

(defun deleteMaxOcc1 (l max)
	(cond
		(
			(null l) nil
		)
		(
			(= (car l) max) (deleteMaxOcc1 (cdr l) max)
		)
		(
			t (cons (car l) (deleteMaxOcc1 (cdr l) max))
		)
	)
)

(defun mainDeleteMax1 (l)
	(deleteMaxOcc1 l (maxElem1 l))
)

; d change) write a function to remove all occurrences of the maximum number from a list, at any level.

; maxAB(a, b) = 
; = a , if b is not a number
; = b , if a is not a number
; = a , if a > b
; = b , otherwise

(defun maxAB(a b)
    (cond
        (
			(not (numberp b)) a
		)
        (
			(not (numberp a)) b
		)
        (
			(> a b) a
		)
        (
			t b
		)
    )
)

; maxInList(l1l2...ln) = 
; = nil , if n = 0
; = maxAB(maxInList(l1), maxInList(l2...ln)) , if l1 is a list
; = maxAB(l1, maxInList(l2...ln)) , otherwise

(defun maxInList (l)
    (cond
        (
			(null l) nil
		)
        (
			(listp (car l)) (maxAB (maxInList (car l)) (maxInList (cdr l)))
		)
        (
			t (maxAB (car l) (maxInList (cdr l)))
		)
    )
)

; app (l1l2...ln, p1p2...pm) = 
; = p1p2...pm, if n = 0
; = {l1} U app(l2...ln, p1p2...pm) , otherwise

(defun app (l res)
    (cond
        (
			(null l) res
		)
        (
			t (cons (car l) (app (cdr l) res))
		)
    )
)

; deleteMax(l1l2...ln, max) = 
; = nil , if n = 0
; = deleteMax(l1, max) U deleteMax(l2...ln, max) , if l1 is a list
; = deleteMax(l2...ln, max) , if l1 = max
; = {l1} U deleteMax(l2...ln, max) , otherwise

(defun deleteMax(l max)
    (cond
        (
			(null l) nil
		)
        (
			(listp (car l)) (cons (deleteMax (car l) max) (deleteMax (cdr l) max))
		)
        (
			(equal (car l) max) (deleteMax (cdr l) max)
		)
        (
			t (cons (car l) (deleteMax (cdr l) max))
		)
    )
)

(defun mainDeleteMax(l)
    (deleteMax l (maxInList l))
)



; ! --- UNIT TESTING --- !

(fiveam:test testMainRemN
	(fiveam:is (equal '(1 3 5) (mainRemN '(1 2 3 4 5 6) 2)))
	(fiveam:is (equal '(1) (mainRemN '(1) 2)))
	(fiveam:is (equal '(1 1 1 1 1) (mainRemN '(1 1 1 1 1 1) 5)))
	(fiveam:is (equal '(51 41 62 72 47 25) (mainRemN '(51 41 62 72 47 25) 10)))
	(fiveam:is (equal nil (mainRemN '(9 7 5 3 1) 1)))
)

(fiveam:test testMainValley
	(fiveam:is (equal nil (mainValley '(1 2 3))))
	(fiveam:is (equal t (mainValley '(5 3 5))))
	(fiveam:is (equal nil (mainValley '(1 0 1 0))))
	(fiveam:is (equal nil (mainValley '(1 0))))
	(fiveam:is (equal nil (mainValley '())))
	(fiveam:is (equal t (mainValley '(5 4 3 2 1 2 3 4 5))))
)

(fiveam:test testMainMinNum
	(fiveam:is (equal 0 (mainMinNum '(1 2 3 (4 7 2) (2 3 3 (0 9 9))))))
	(fiveam:is (equal nil (mainMinNum '())))
	(fiveam:is (equal -1 (mainMinNum '(0 0 0 0 0 -1 0))))
	(fiveam:is (equal 12 (mainMinNum '(581 125 26 236 73 125 57 5478 12 15 26))))
	(fiveam:is (equal 0 (mainMinNum '(0 ((((((1)))))) 10))))
)

(fiveam:test testMainDeleteMax
	(fiveam:is (equal '(1 5 6 2 4 7 5 8 6 7 5 6 4 8 8 7 6 1 6 4) (mainDeleteMax1 '(1 5 6 2 4 7 5 8 6 7 5 6 4 8 8 7 6 9 1 6 4 9))))
	(fiveam:is (equal nil (mainDeletemax1 '(9 9 9 9 9))))
	(fiveam:is (equal nil (mainDeletemax1 '(0))))
	(fiveam:is (equal nil (mainDeletemax1 '())))
	(fiveam:is (equal '(-1 1 2 2 1 -1) (mainDeletemax1 '(-1 1 2 3 3 2 1 -1))))
)

(fiveam:test testMainDeleteMaxChange
	(fiveam:is (equal '(1 2 (3 4) 4 (1)) (mainDeleteMax '(1 2 (3 4) 4 (1 9)))))
	(fiveam:is (equal nil (mainDeleteMax '())))
	(fiveam:is (equal '(1 2 (3 1)) (mainDeleteMax '(1 2 (3 9 1)))))
	(fiveam:is (equal '((1 2)) (mainDeleteMax '(9 9 9 9 9 9 (1 2)))))
	(fiveam:is (equal nil (mainDeleteMax '(9 9 9 9 9 9))))
)