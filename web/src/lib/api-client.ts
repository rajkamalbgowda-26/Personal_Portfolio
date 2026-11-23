/**
 * Typed TypeScript client for Quicksilver API
 * Automatically generated / mirrored from FastAPI OpenAPI 3.1.0 specification
 */

export interface DeliveryStage {
  id: string;
  label: string;
  detail: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  focus: string;
  rotating_lines: string[];
  tagline: string;
  philosophy: string[];
  delivery_stages: DeliveryStage[];
  bio: string;
  location: string;
  availability: string;
}

export interface Metrics {
  projects_delivered: int;
  models_in_production: int;
  clients_served?: int;
  revenue_impact?: string;
  team_size?: int;
  years_experience?: int;
  engineers_led: int;
  revenue_impact_usd: int;
  uptime_sla_percent: number;
  avg_p99_latency_ms: int;
  tokens_processed_monthly: string;
}
type int = number;

export interface Capability {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  years: number;
  description: string;
  technologies: string[];
  project_ids: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectDecision {
  choice: string;
  over: string;
  because: string;
}

export interface Project {
  slug: string;
  title: string;
  domain: string;
  client?: string;
  year?: number;
  role: string;
  problem?: string;
  solution?: string;
  summary: string;
  metrics: ProjectMetric[];
  stack: string[];
  decisions?: ProjectDecision[];
  evaluation?: string;
  deployment?: string;
  leadership?: string;
  lessons?: string[];
  architecture_id: string;
  cover_image: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: string;
  layer: string;
  tech: string;
  details: string;
  responsibility?: string;
  why_chosen?: string;
  scaling?: string;
  failure_modes?: string;
  cost_notes?: string;
  security_notes?: string;
}

export interface RequestFlowStep {
  step: number;
  source: string;
  target: string;
  label: string;
  latency: string;
}

export interface Architecture {
  id: string;
  title: string;
  category: string;
  description: string;
  request_flow: RequestFlowStep[];
  nodes?: ArchitectureNode[];
}

export interface LeadershipRole {
  title: string;
  focus: string;
}

export interface LeadershipRitual {
  name: string;
  cadence: string;
  description: string;
}

export interface Leadership {
  team_size: number;
  roles: LeadershipRole[];
  rituals: LeadershipRitual[];
}

export interface LeadershipRole {
  title: string;
  focus: string;
}

export interface LeadershipRitual {
  name: string;
  cadence: string;
  description: string;
}

export interface LeadershipData {
  team_size: number;
  roles: LeadershipRole[];
  rituals: LeadershipRitual[];
}

export interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  milestone: string;
}

export interface ContactFormRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
  budget?: string;
  honeypot?: string;
}

export interface ContactFormResponse {
  success: boolean;
  transmission_id: string;
  message: string;
}

export interface EventTelemetryRequest {
  event_type: string;
  section?: string;
  metadata?: Record<string, unknown>;
}

export interface EventTelemetryResponse {
  recorded: boolean;
  event_id: string;
}

export interface HealthResponse {
  status: string;
  version: string;
  environment: string;
  uptime_seconds: number;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

class QuicksilverApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl ||
      (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
      "http://localhost:8001";
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    };

    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errData: unknown;
      try {
        errData = await res.json();
      } catch {
        errData = await res.text();
      }
      throw new ApiError(res.status, `API request failed: ${res.statusText}`, errData);
    }

    return (await res.json()) as T;
  }

  // Health
  async getHealth(): Promise<HealthResponse> {
    return this.request<HealthResponse>("/health");
  }

  // Profile
  async getProfile(): Promise<Profile> {
    return this.request<Profile>("/api/profile");
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>("/api/projects");
  }

  async getProject(slug: string): Promise<Project> {
    return this.request<Project>(`/api/projects/${encodeURIComponent(slug)}`);
  }

  // Architectures
  async getArchitectures(): Promise<Architecture[]> {
    return this.request<Architecture[]>("/api/architectures");
  }

  async getArchitecture(slug: string): Promise<Architecture> {
    return this.request<Architecture>(`/api/architectures/${encodeURIComponent(slug)}`);
  }

  // Skills
  async getSkills(): Promise<Capability[]> {
    return this.request<Capability[]>("/api/skills");
  }

  // Timeline
  async getTimeline(): Promise<TimelineItem[]> {
    return this.request<TimelineItem[]>("/api/timeline");
  }

  // Leadership
  async getLeadership(): Promise<LeadershipData> {
    return this.request<LeadershipData>("/api/leadership");
  }

  // Metrics
  async getMetrics(): Promise<Metrics> {
    return this.request<Metrics>("/api/metrics");
  }

  // Contact
  async submitContact(payload: ContactFormRequest): Promise<ContactFormResponse> {
    return this.request<ContactFormResponse>("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Telemetry
  async recordEvent(payload: EventTelemetryRequest): Promise<EventTelemetryResponse> {
    return this.request<EventTelemetryResponse>("/api/events", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}

export const apiClient = new QuicksilverApiClient();

