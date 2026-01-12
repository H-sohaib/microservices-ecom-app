package tech.sohaib_tarek.gatewayservice.dto;

public class EnableUserRequest {
  private boolean enabled;

  public EnableUserRequest() {
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }
}
