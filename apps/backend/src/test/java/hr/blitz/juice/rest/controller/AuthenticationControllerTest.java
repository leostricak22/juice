package hr.blitz.juice.rest.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.blitz.juice.domain.enumeration.CroatianCounty;
import hr.blitz.juice.domain.enumeration.Role;
import hr.blitz.juice.domain.model.User;
import hr.blitz.juice.rest.dto.AuthenticationRequest;
import hr.blitz.juice.rest.dto.AuthenticationResponse;
import hr.blitz.juice.rest.dto.UserRequest;
import hr.blitz.juice.service.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AuthenticationControllerTest {

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private AuthenticationController authenticationController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testRegister() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setName("John");
        userRequest.setSurname("Doe");
        userRequest.setUsername("johndoe");
        userRequest.setEmail("john.doe@example.com");
        userRequest.setPassword("password123");
        userRequest.setLocation(CroatianCounty.LICKO_SENJSKA);

        User mappedUser = User.builder()
                .name("John")
                .surname("Doe")
                .username("johndoe")
                .email("john.doe@example.com")
                .role(Role.USER)
                .location(CroatianCounty.LICKO_SENJSKA)
                .build();

        AuthenticationResponse authenticationResponse = new AuthenticationResponse("token123");

        when(modelMapper.map(any(UserRequest.class), eq(User.class))).thenReturn(mappedUser);
        when(authenticationService.register(any(User.class), eq("password123")))
                .thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userRequest))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token123"));

        verify(modelMapper, times(1)).map(any(UserRequest.class), eq(User.class));
        verify(authenticationService, times(1))
                .register(any(User.class), eq("password123"));
    }

    @Test
    void testLogin() throws Exception {
        AuthenticationRequest authenticationRequest = AuthenticationRequest.builder()
                .email("john.doe@example.com")
                .password("password123")
                .build();

        AuthenticationResponse authenticationResponse = new AuthenticationResponse("token123");

        when(authenticationService.login(any(AuthenticationRequest.class))).thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token123"));

        verify(authenticationService, times(1)).login(any(AuthenticationRequest.class));
    }

    @Test
    @WithMockUser
    void testUser() throws Exception {
        User user = User.builder()
                .name("John")
                .surname("Doe")
                .username("johndoe")
                .email("john.doe@example.com")
                .role(Role.USER)
                .location(CroatianCounty.LICKO_SENJSKA)
                .build();

        when(authenticationService.findUserBySessionUsername()).thenReturn(user);

        mockMvc.perform(get("/api/auth/user"))
                .andExpect(status().isOk());

        verify(authenticationService, times(1)).findUserBySessionUsername();
    }
}