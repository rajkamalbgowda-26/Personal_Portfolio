from fastapi.testclient import TestClient

def test_health_check(client: TestClient):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "uptime_seconds" in data

def test_get_profile(client: TestClient):
    response = client.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Rajkamal B Gowda"
    assert data["initials"] == "RG"
    assert len(data["philosophy"]) > 0
    assert len(data["delivery_stages"]) == 6

def test_get_projects(client: TestClient):
    response = client.get("/api/projects")
    assert response.status_code == 200
    projects = response.json()
    assert len(projects) >= 5
    first = projects[0]
    assert "slug" in first
    assert "metrics" in first
    assert len(first["metrics"]) > 0

def test_get_single_project(client: TestClient):
    # Test valid project
    response = client.get("/api/projects/txtsense")
    assert response.status_code == 200
    project = response.json()
    assert project["slug"] == "txtsense"
    assert "TXTSense" in project["title"]

    # Test missing project (404)
    response_404 = client.get("/api/projects/non-existent-slug")
    assert response_404.status_code == 404
    assert "not found" in response_404.json()["detail"].lower()

def test_get_architectures(client: TestClient):
    response = client.get("/api/architectures")
    assert response.status_code == 200
    archs = response.json()
    assert len(archs) >= 2
    first = archs[0]
    assert "id" in first
    assert len(first["request_flow"]) > 0

def test_get_single_architecture(client: TestClient):
    response = client.get("/api/architectures/enterprise-multi-agent")
    assert response.status_code == 200
    arch = response.json()
    assert arch["id"] == "enterprise-multi-agent"
    assert len(arch["nodes"]) > 0

    response_404 = client.get("/api/architectures/missing-arch")
    assert response_404.status_code == 404

def test_get_skills(client: TestClient):
    response = client.get("/api/skills")
    assert response.status_code == 200
    skills = response.json()
    assert len(skills) >= 5
    skill_names = [s["name"] for s in skills]
    assert "AI & Machine Learning" in skill_names
    assert "Cloud & Engineering" in skill_names

def test_get_timeline(client: TestClient):
    response = client.get("/api/timeline")
    assert response.status_code == 200
    timeline = response.json()
    assert len(timeline) >= 4
    assert "Manager" in timeline[0]["role"]

def test_get_metrics(client: TestClient):
    response = client.get("/api/metrics")
    assert response.status_code == 200
    metrics = response.json()
    assert metrics["projects_delivered"] >= 18
    assert metrics["engineers_led"] >= 12
    assert metrics["revenue_impact_usd"] > 0

def test_get_leadership(client: TestClient):
    response = client.get("/api/leadership")
    assert response.status_code == 200
    data = response.json()
    assert data["team_size"] >= 12
    assert len(data["roles"]) >= 5
    assert len(data["rituals"]) >= 3

def test_contact_submission_success(client: TestClient):
    payload = {
        "name": "Sarah Connor",
        "email": "sarah@cyberdyne.ai",
        "company": "Cyberdyne Systems",
        "message": "We need an enterprise agentic workflow with Azure OpenAI and sub-second SLAs.",
        "budget": "$100k - $250k"
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True
    assert res_data["transmission_id"].startswith("TX-")

def test_contact_honeypot_spam_trap(client: TestClient):
    payload = {
        "name": "Bot Spammer",
        "email": "bot@spam.com",
        "message": "Buy cheap backlinks now!",
        "honeypot": "iamabot"
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 201
    assert response.json()["success"] is True

def test_contact_validation_failure(client: TestClient):
    # Invalid email
    payload = {
        "name": "John Doe",
        "email": "not-an-email",
        "message": "Short"
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422

def test_telemetry_event(client: TestClient):
    payload = {
        "event_type": "view_architecture",
        "section": "enterprise-multi-agent",
        "metadata": {"mode": "3d_orbit", "fps": 120}
    }
    response = client.post("/api/events", json=payload)
    assert response.status_code == 201
    assert response.json()["recorded"] is True
    assert response.json()["event_id"].startswith("EVT-")

def test_twin_chat_stream(client: TestClient):
    payload = {"message": "How does Hyperion multi-agent architecture work?"}
    response = client.post("/api/twin/chat", json=payload)
    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]
    content = response.text
    assert "data: " in content
    assert "Hyperion" in content

