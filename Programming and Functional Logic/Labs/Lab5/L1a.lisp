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
			(/= (mod p n) 0) (cons (car l) (remN (cdr l) n (+ p 1)))
		)
		(
			t (remN (cdr l) n (+ p 1))
		)
	)
)

(defun mainRemN (l n)
	(remN l n 0)
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
; = nil , if a is not a number and b is not a numbe
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


; d) Write a function that deletes from a linear list of all occurrences of the maximum element.

; deleteMax(l1l2...ln, max) =
; = [], if n = 0
; = {l1} U deleteMax(l2...ln), if l1 != max
; = deleteMax(l2...ln), otherwise

(defun maxElem (l)
	(cond
		(
			(null l) nil
		)
		(
			(null (cdr l)) (car l)
		)
		(
			(> (car l) (maxElem (cdr l))) (car l)
		)
		(
			t (maxElem (cdr l))
		)
	)
)

(defun deleteMaxOcc (l max)
	(cond
		(
			(null l) nil
		)
		(
			(= (car l) max) (deleteMaxOcc (cdr l) max)
		)
		(
			t (cons (car l) (deleteMaxOcc (cdr l) max))
		)
	)
)

(defun mainDeleteMax (l)
	(deleteMaxOcc l (maxElem l))
)



; ! --- UNIT TESTING --- !

(fiveam:test testMainRemN
	(fiveam:is (equal '(2 4 6) (mainRemN '(1 2 3 4 5 6) 2)))
	(fiveam:is (equal nil (mainRemN '(1) 2)))
	(fiveam:is (equal '(1 1 1 1) (mainRemN '(1 1 1 1 1 1) 5)))
	(fiveam:is (equal '(41 62 72 47 25) (mainRemN '(51 41 62 72 47 25) 10)))
	(fiveam:is (equal nil (mainRemN '(9 7 5 3 1) 1)))
)

(fiveam:test testMainValley
	(fiveam:is (equal nil (mainValley '(1 2 3))))
	(fiveam:is (equal t (mainValley '(5 3 5))))
	(fiveam:is (equal nil (mainValley '(1 0 1 0))))
	(fiveam:is (equal nil (mainValley '(1 0))))
	(fiveam:is (equal nil (mainValley '())))
)

(fiveam:test testMainMinNum
	(fiveam:is (equal 0 (mainMinNum '(1 2 3 (4 7 2) (2 3 3 (0 9 9))))))
	(fiveam:is (equal nil (mainMinNum '())))
	(fiveam:is (equal -1 (mainMinNum '(0 0 0 0 0 -1 0))))
	(fiveam:is (equal 12 (mainMinNum '(581 125 26 236 73 125 57 5478 12 15 26))))
	(fiveam:is (equal 0 (mainMinNum '(0 ((((((1)))))) 10))))
)

(fiveam:test testMainDeleteMax
	(fiveam:is (equal '(1 5 6 2 4 7 5 8 6 7 5 6 4 8 8 7 6 1 6 4) (mainDeleteMax '(1 5 6 2 4 7 5 8 6 7 5 6 4 8 8 7 6 9 1 6 4 9))))
	(fiveam:is (equal nil (mainDeletemax '(9 9 9 9 9))))
	(fiveam:is (equal nil (mainDeletemax '(0))))
	(fiveam:is (equal nil (mainDeletemax '())))
	(fiveam:is (equal '(-1 1 2 2 1 -1) (mainDeletemax '(-1 1 2 3 3 2 1 -1))))
)

(defun runAllTests ()
	(fiveam:run!)
)