package com.example.HotelManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/customers/addCustomer")
    public String addCustomers(@RequestParam(required = false) String fullName,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String password) {

        // Check if the email already exists in the database
        Customer existingCustomer = customerRepository.findByEmail(email);
        if (existingCustomer != null) {
            return "Email already exists";
        }

        Customer customer = new Customer();
        customer.setFullName(fullName);
        customer.setPhoneNumber(phoneNumber);
        customer.setEmail(email);
        customer.setPassword(password);

        // Generate a unique customerId
        String customerId = generateCustomerId(); // Replace this with your logic to generate the customerId
        customer.setCustomerId(customerId);

        customerRepository.save(customer);
        return "User details added";
    }

    private String generateCustomerId() {
        // Implement your logic to generate a unique customerId here
        // For example, you can use a UUID (Universally Unique Identifier)
        String customerId = UUID.randomUUID().toString();
        return customerId;
    }

    @PostMapping("/customers/login")
    public String customerLogin(@RequestParam String email, @RequestParam String password) {
        // Find the customer by email
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            return "Email not found";
        }

        // Check if the password matches
        if (!customer.getPassword().equals(password)) {
            return "Invalid password";
        }

        // Successful login
        return "Login successful";
    }

    // customer profile
    @GetMapping("/customers/{email}")
    public ResponseEntity<Customer> getCustomerProfile(@PathVariable String email) {
        // Find the customer by email
        Customer customer = customerRepository.findByEmail(email);

        if (customer != null) {
            // Return customer profile details in the response
            return ResponseEntity.ok(customer);
        } else {
            // If customer with the provided email is not found
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/customers/CustomereList")
    public Iterable<Customer> listOfUser() {
        return customerRepository.findAll();
    }
}
