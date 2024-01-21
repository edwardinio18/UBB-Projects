// Problem 1: Given the following collection  List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class p1 {
	public static void main(String[] args) {
		// a) keep only the numbers which are multiple of 3 or multiple of 2;
		List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
		List<Integer> res = numbers.stream().filter(x -> x % 3 == 0 || x % 2 == 0).collect(Collectors.toList());
		System.out.println(res);

		// b) transform each remaining number into a string, that consists of a prefix "A", the successor of the number and the suffix "B" (eg. 6 is transformed into "A7B")
		List<String> res2 = res.stream().map(x -> "A" + (x + 1) + "B").collect(Collectors.toList());
		System.out.println(res2);

		// c) concatenate all the strings
		String res3 = res2.stream().collect(Collectors.joining());
		System.out.println(res3);
	}
}