from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, EmailStr, Field, ConfigDict, model_validator

class DeliveryStageSchema(BaseModel):
    id: str
    label: str
    detail: str

class ProfileSchema(BaseModel):
    name: str
    initials: str
    title: str
    location: str
    tagline: str
    bio: str
    philosophy: List[str]
    links: Optional[Dict[str, Optional[str]]] = None
    focus: Optional[str] = "End-to-End AI Systems • Agentic Workflows • Azure Enterprise AI"
    rotating_lines: Optional[List[str]] = [
        "Designing agentic systems with dynamic tool orchestration",
        "Shipping GenAI to production at enterprise scale",
        "Leading 12 full-stack AI engineers from discovery to SLA",
        "Architecting Azure end-to-end cloud & MLOps pipelines",
    ]
    delivery_stages: Optional[List[DeliveryStageSchema]] = [
        DeliveryStageSchema(id="discover", label="Discover", detail="Deconstruct business capability and establish quantifiable evaluation metrics."),
        DeliveryStageSchema(id="architect", label="Architect", detail="Spec multi-tier topology, token budgets, zero-trust security perimeter, and failover fallbacks."),
        DeliveryStageSchema(id="build", label="Build", detail="Implement core pipelines, async microservices, vector retrieval, and custom model harnesses."),
        DeliveryStageSchema(id="evaluate", label="Evaluate", detail="RAG triad scoring, hallucination guards, semantic drift validation, and load stress testing."),
        DeliveryStageSchema(id="deploy", label="Deploy", detail="Bicep IaC, canary rollout on Azure Container Apps, zero-downtime blue/green swap."),
        DeliveryStageSchema(id="operate", label="Operate", detail="Application Insights OpenTelemetry, cost-per-token governance, automated drift alerting."),
    ]
    availability: Optional[str] = "Advisory & Principal Architecture"

class MetricsSchema(BaseModel):
    projects_delivered: int
    models_in_production: int
    clients_served: Optional[int] = 14
    revenue_impact: Optional[str] = "$42M+ delivered"
    team_size: Optional[int] = 12
    years_experience: Optional[int] = 8
    engineers_led: Optional[int] = 12
    revenue_impact_usd: Optional[int] = 42000000
    uptime_sla_percent: Optional[float] = 99.98
    avg_p99_latency_ms: Optional[int] = 182
    tokens_processed_monthly: Optional[str] = "1.4B+"

    @model_validator(mode="before")
    @classmethod
    def populate_defaults(cls, data: Any):
        if isinstance(data, dict):
            if "engineers_led" not in data and "team_size" in data:
                data["engineers_led"] = data["team_size"]
            if "revenue_impact_usd" not in data and "revenue_impact" in data:
                data["revenue_impact_usd"] = 42000000
        return data

class CapabilitySchema(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None
    group: Optional[str] = None
    category: Optional[str] = None
    level: Optional[int] = None
    proficiency: Optional[int] = 95
    years: Optional[int] = 5
    tech: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    description: Optional[str] = None
    project_ids: Optional[List[str]] = []

    @model_validator(mode="before")
    @classmethod
    def normalize_skill(cls, data: Any):
        if isinstance(data, dict):
            name = data.get("name") or data.get("group") or "AI Capability"
            data["name"] = name
            if not data.get("id"):
                data["id"] = name.lower().replace(" ", "-").replace("&", "and")
            if not data.get("category"):
                data["category"] = data.get("group") or "Core AI"
            if data.get("level") and not data.get("proficiency"):
                data["proficiency"] = int(data["level"]) * 20
            if data.get("tech") and not data.get("technologies"):
                data["technologies"] = data["tech"]
            if not data.get("technologies"):
                data["technologies"] = []
            if not data.get("description"):
                data["description"] = f"Advanced engineering in {', '.join(data.get('technologies', []))}."
        return data

class ProjectMetricSchema(BaseModel):
    label: str
    value: str

class ProjectDecisionSchema(BaseModel):
    choice: str
    over: str
    because: str

class ProjectSchema(BaseModel):
    slug: str
    title: str
    domain: str
    client: Optional[str] = None
    cover: Optional[str] = None
    cover_image: Optional[str] = None
    year: Optional[int] = 2026
    role: str
    problem: Optional[str] = None
    solution: Optional[str] = None
    summary: Optional[str] = None
    metrics: List[ProjectMetricSchema] = []
    stack: List[str] = []
    decisions: Optional[List[ProjectDecisionSchema]] = []
    evaluation: Optional[str] = None
    deployment: Optional[str] = None
    leadership: Optional[str] = None
    lessons: Optional[List[str]] = []
    architecture: Optional[str] = None
    architecture_id: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def normalize_project(cls, data: Any):
        if isinstance(data, dict):
            if not data.get("cover_image"):
                data["cover_image"] = data.get("cover") or "/assets/generated/project-quicksilver.png"
            if not data.get("architecture_id"):
                data["architecture_id"] = data.get("architecture") or "multi-agent-orchestration"
            if not data.get("summary"):
                prob = data.get("problem", "")
                sol = data.get("solution", "")
                data["summary"] = f"{prob} {sol}".strip() or data.get("title", "")
        return data

class ArchitectureNodeSchema(BaseModel):
    id: str
    label: str
    type: Optional[str] = "Service"
    layer: str
    tech: Optional[str] = ""
    details: Optional[str] = ""
    why: Optional[str] = None
    why_chosen: Optional[str] = None
    scaling: Optional[str] = None
    failure_modes: Optional[str] = None
    cost: Optional[str] = None
    cost_notes: Optional[str] = None
    security: Optional[str] = None
    security_notes: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def normalize_node(cls, data: Any):
        if isinstance(data, dict):
            if not data.get("why_chosen"):
                data["why_chosen"] = data.get("why")
            if not data.get("cost_notes"):
                data["cost_notes"] = data.get("cost")
            if not data.get("security_notes"):
                data["security_notes"] = data.get("security")
            if not data.get("tech"):
                data["tech"] = data.get("label", "")
            if not data.get("details"):
                data["details"] = data.get("why") or data.get("label", "")
        return data

class ArchitectureEdgeSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    from_node: str = Field(..., alias="from")
    to_node: str = Field(..., alias="to")
    label: Optional[str] = None

class RequestPathStepSchema(BaseModel):
    step: int
    node: Optional[str] = None
    caption: Optional[str] = None
    source: Optional[str] = None
    target: Optional[str] = None
    label: Optional[str] = None
    latency: Optional[str] = None

class RequestFlowStepSchema(BaseModel):
    step: int
    source: str
    target: str
    label: str
    latency: str

class ArchitectureSchema(BaseModel):
    slug: Optional[str] = None
    id: Optional[str] = None
    title: str
    summary: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = "Enterprise Architecture"
    layers: Optional[List[str]] = []
    nodes: Optional[List[ArchitectureNodeSchema]] = []
    edges: Optional[List[ArchitectureEdgeSchema]] = []
    request_path: Optional[List[RequestPathStepSchema]] = []
    request_flow: Optional[List[RequestFlowStepSchema]] = []
    overlays: Optional[Dict[str, Any]] = None

    @model_validator(mode="before")
    @classmethod
    def normalize_arch(cls, data: Any):
        if isinstance(data, dict):
            if not data.get("id"):
                data["id"] = data.get("slug") or "arch-spec"
            if not data.get("description"):
                data["description"] = data.get("summary") or data.get("title", "")
            if not data.get("request_flow") and data.get("request_path"):
                flow = []
                path = data.get("request_path", [])
                for i in range(len(path)):
                    curr = path[i]
                    nxt = path[i + 1] if i + 1 < len(path) else path[i]
                    flow.append({
                        "step": curr.get("step", i + 1),
                        "source": curr.get("node") or "Client",
                        "target": nxt.get("node") or curr.get("node") or "Server",
                        "label": curr.get("caption") or "Data Packet",
                        "latency": "15ms",
                    })
                data["request_flow"] = flow
            if not data.get("request_flow"):
                data["request_flow"] = [
                    {
                        "step": 1,
                        "source": "Client",
                        "target": "Gateway",
                        "label": "Ingress Request",
                        "latency": "20ms",
                    }
                ]
        return data

class LeadershipRoleSchema(BaseModel):
    title: str
    focus: Optional[str] = None

class LeadershipRitualSchema(BaseModel):
    name: str
    cadence: str
    description: str

class LeadershipSchema(BaseModel):
    team_size: Optional[int] = 12
    size: Optional[int] = 12
    roles: List[Union[str, LeadershipRoleSchema]] = []
    how_i_lead: Optional[List[str]] = []
    rituals: Optional[List[LeadershipRitualSchema]] = [
        LeadershipRitualSchema(
            name="Architecture Review Board",
            cadence="Bi-weekly",
            description="Rigorous threat modeling, latency budget sign-off, and vendor lock-in analysis before writing code.",
        ),
        LeadershipRitualSchema(
            name="Evaluation & Triad Grading",
            cadence="Weekly",
            description="Automated regression testing of RAG retrieval context relevance and groundedness scores.",
        ),
        LeadershipRitualSchema(
            name="Production Canary Verification",
            cadence="Per Sprint",
            description="Synthetic traffic testing against staging and phased canary deployments with zero downtime.",
        ),
    ]

    @model_validator(mode="before")
    @classmethod
    def normalize_team(cls, data: Any):
        if isinstance(data, dict):
            if not data.get("team_size") and data.get("size"):
                data["team_size"] = data["size"]
            raw_roles = data.get("roles", [])
            normalized_roles = []
            for r in raw_roles:
                if isinstance(r, str):
                    normalized_roles.append({"title": r, "focus": "Engineering & Delivery"})
                else:
                    normalized_roles.append(r)
            data["roles"] = normalized_roles
        return data

class TimelineItemSchema(BaseModel):
    year: Any
    title: Optional[str] = None
    detail: Optional[str] = None
    role: Optional[str] = None
    organization: Optional[str] = None
    milestone: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def normalize_timeline(cls, data: Any):
        if isinstance(data, dict):
            data["year"] = str(data.get("year", ""))
            if not data.get("role"):
                data["role"] = data.get("title") or "AI Application Architect"
            if not data.get("organization"):
                data["organization"] = "Enterprise Practice"
            if not data.get("milestone"):
                data["milestone"] = data.get("detail") or data.get("title") or ""
        return data

class PortfolioDataSchema(BaseModel):
    profile: ProfileSchema
    metrics: MetricsSchema
    skills: Optional[List[CapabilitySchema]] = []
    capabilities: Optional[List[CapabilitySchema]] = []
    projects: List[ProjectSchema]
    architectures: List[ArchitectureSchema]
    team: Optional[LeadershipSchema] = None
    leadership: Optional[LeadershipSchema] = None
    timeline: List[TimelineItemSchema]
    agent_traces: Optional[List[Dict[str, Any]]] = []

    @model_validator(mode="before")
    @classmethod
    def normalize_portfolio(cls, data: Any):
        if isinstance(data, dict):
            if not data.get("capabilities") and data.get("skills"):
                data["capabilities"] = data["skills"]
            if not data.get("skills") and data.get("capabilities"):
                data["skills"] = data["capabilities"]
            if not data.get("leadership") and data.get("team"):
                data["leadership"] = data["team"]
            if not data.get("team") and data.get("leadership"):
                data["team"] = data["leadership"]
        return data

# Inquiries & Telemetry
class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)
    budget: Optional[str] = Field(None, max_length=50)
    honeypot: Optional[str] = None

class ContactFormResponse(BaseModel):
    success: bool
    transmission_id: str
    message: str

class EventTelemetryRequest(BaseModel):
    event_type: str = Field(..., min_length=2, max_length=50)
    section: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class EventTelemetryResponse(BaseModel):
    recorded: bool
    event_id: str

class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
    uptime_seconds: float
