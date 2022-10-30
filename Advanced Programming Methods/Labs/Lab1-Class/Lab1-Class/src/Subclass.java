public class Subclass extends Class {

	public Subclass() {
		System.out.println("Child class");
	}
	@Override
	int add(int x, int y) {
		return x + y + x;
	}
}