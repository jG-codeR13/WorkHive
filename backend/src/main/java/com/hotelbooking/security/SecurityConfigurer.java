package com.hotelbooking.security;

import com.hotelbooking.service.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import static com.hotelbooking.constants.Constants.LOGIN_ENDPOINT;
import static com.hotelbooking.constants.Constants.SIGNUP_ENDPOINT;

@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
  private final JwtRequestFilter jwtRequestFilter;
  private final MyUserDetailsService myUserDetailsService;

  public SecurityConfigurer(
      final JwtRequestFilter jwtRequestFilter, final MyUserDetailsService myUserDetailsService) {
    this.jwtRequestFilter = jwtRequestFilter;
    this.myUserDetailsService = myUserDetailsService;
  }

  @Override
  protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(myUserDetailsService);
  }

  @Bean
  public PasswordEncoder getPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(final HttpSecurity http) throws Exception {
    http.csrf()
        .disable()
        .cors()
        .and()
        .authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS, "/**")
        .permitAll()
        .antMatchers(HttpMethod.POST, "/hotels", "/rooms", "/amenities")
        .hasAuthority("ADMIN")
        .antMatchers(HttpMethod.GET, "/bookings")
        .hasAuthority("ADMIN")
        .antMatchers(HttpMethod.DELETE, "/hotels", "/rooms", "/amenities")
        .hasAuthority("ADMIN")
        .antMatchers(HttpMethod.PUT, "/hotels", "/rooms", "/amenities")
        .hasAuthority("ADMIN")
        .antMatchers(
            LOGIN_ENDPOINT,
            SIGNUP_ENDPOINT,
            "/health",
            "/amenities/**",
            "/hotels/**",
            "/rooms/**",
            "/",
            "/static/**",
            "/css/**")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }


}
