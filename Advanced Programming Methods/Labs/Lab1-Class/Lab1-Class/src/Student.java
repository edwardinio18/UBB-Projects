public class Student {
	private static String firstName;
	private static String lastName;
	private static String CNP;

	public Student(String first_name, String last_name, String cnp) {
		firstName = first_name;
		lastName = last_name;
		CNP = cnp;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getCNP() {
		return CNP;
	}
}