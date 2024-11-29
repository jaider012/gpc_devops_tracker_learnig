"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Plus, CheckCircle, Circle, BookOpen, Sun, Moon, Trash2 } from "lucide-react";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
interface Item {
  id: number;
  text: string;
  completed: boolean;
}

interface Section {
  title: string;
  items: Item[];
}

interface Sections {
  [key: string]: Section;
}

interface ProgressStats {
  completed: number;
  total: number;
}

const GCPDevOpsTracker: React.FC = () => {
  const initialSections: Sections = {
    infrastructure: {
      title: "1. Planificación y Configuración de Infraestructura en la Nube",
      items: [
        {
          id: 1,
          text: "Infrastructure as Code (IaC) con Terraform",
          completed: false,
        },
        {
          id: 2,
          text: "Practica la creación de recursos con Google Cloud Deployment Manager",
          completed: false,
        },
        {
          id: 3,
          text: "Diseña una arquitectura de microservicios en GCP",
          completed: false,
        },
        {
          id: 4,
          text: "Configura redes en GCP: VPCs, subredes y firewalls",
          completed: false,
        },
        {
          id: 5,
          text: "Configura políticas de seguridad y gestión de identidades con IAM",
          completed: false,
        },
      ],
    },
    cicd: {
      title: "2. Implementación de Pipelines de CI/CD",
      items: [
        {
          id: 1,
          text: "Configura pipelines con Cloud Build y conecta repositorios",
          completed: false,
        },
        {
          id: 2,
          text: "Integra GCP con GitHub/Bitbucket para control de versiones",
          completed: false,
        },
        {
          id: 3,
          text: "Crea triggers automáticos para despliegues continuos",
          completed: false,
        },
        {
          id: 4,
          text: "Configura y utiliza Artifact Registry y Container Registry para gestionar imágenes",
          completed: false,
        },
      ],
    },
    services: {
      title: "3. Optimización de Servicios",
      items: [
        {
          id: 1,
          text: "Familiarízate con Compute Engine y gestiona instancias",
          completed: false,
        },
        {
          id: 2,
          text: "Aprende a desplegar y administrar clústeres en Google Kubernetes Engine (GKE)",
          completed: false,
        },
        {
          id: 3,
          text: "Experimenta con Cloud Run, App Engine y Cloud Functions",
          completed: false,
        },
        {
          id: 4,
          text: "Configura balanceadores de carga y políticas de escalado automático",
          completed: false,
        },
      ],
    },
    monitoring: {
      title: "4. Monitoreo, Logging y Observabilidad",
      items: [
        {
          id: 1,
          text: "Configura y utiliza Cloud Monitoring y Cloud Logging para métricas y logs",
          completed: false,
        },
        {
          id: 2,
          text: "Familiarízate con Error Reporting, Cloud Trace, Profiler y Debugger",
          completed: false,
        },
        {
          id: 3,
          text: "Crea alertas y dashboards personalizados",
          completed: false,
        },
      ],
    },
    tools: {
      title: "5. Gestión de Configuración y Herramientas",
      items: [
        {
          id: 1,
          text: "Practica con contenedores utilizando Docker",
          completed: false,
        },
        {
          id: 2,
          text: "Gestiona despliegues en Kubernetes con Helm Charts",
          completed: false,
        },
        {
          id: 3,
          text: "Aprende herramientas de gestión de configuración como Ansible, Chef o Puppet",
          completed: false,
        },
        {
          id: 4,
          text: "Configura y gestiona secretos con herramientas como Secret Manager",
          completed: false,
        },
      ],
    },
    sre: {
      title: "6. Prácticas de SRE (Site Reliability Engineering)",
      items: [
        {
          id: 1,
          text: "Define y calcula SLI, SLO y SLA para servicios",
          completed: false,
        },
        {
          id: 2,
          text: "Aprende a trabajar con Error Budgets y estrategias de toil reduction",
          completed: false,
        },
        {
          id: 3,
          text: "Practica la creación de postmortems para incidentes",
          completed: false,
        },
      ],
    },
    security: {
      title: "7. Seguridad y Cumplimiento",
      items: [
        {
          id: 1,
          text: "Configura claves de cifrado con Cloud KMS",
          completed: false,
        },
        {
          id: 2,
          text: "Gestiona secretos y acceso seguro con Secret Manager",
          completed: false,
        },
        {
          id: 3,
          text: "Protege aplicaciones con Cloud Armor y Binary Authorization",
          completed: false,
        },
        {
          id: 4,
          text: "Establece controles avanzados con VPC Service Controls",
          completed: false,
        },
      ],
    },
    data: {
      title: "8. Gestión de Datos y Almacenamiento",
      items: [
        {
          id: 1,
          text: "Configura almacenamiento en Cloud Storage",
          completed: false,
        },
        {
          id: 2,
          text: "Administra bases de datos con Cloud SQL y Cloud Spanner",
          completed: false,
        },
        {
          id: 3,
          text: "Practica estrategias de backup y recuperación",
          completed: false,
        },
        {
          id: 4,
          text: "Diseña planes de migración de datos",
          completed: false,
        },
      ],
    },
    automation: {
      title: "9. Automatización y Optimización",
      items: [
        {
          id: 1,
          text: "Automatiza tareas con Cloud Functions, Cloud Scheduler y Workflows",
          completed: false,
        },
        {
          id: 2,
          text: "Practica la optimización de costos y la gestión eficiente de recursos",
          completed: false,
        },
        {
          id: 3,
          text: "Familiarízate con scripting y automatización usando gcloud CLI",
          completed: false,
        },
      ],
    },
    resources: {
      title: "10. Recursos de Práctica",
      items: [
        {
          id: 1,
          text: "Realiza laboratorios prácticos en Qwiklabs y Cloud Skills Boost",
          completed: false,
        },
        {
          id: 2,
          text: "Lee la documentación oficial de Google Cloud",
          completed: false,
        },
        {
          id: 3,
          text: "Practica con exámenes de prueba y simulaciones",
          completed: false,
        },
        {
          id: 4,
          text: "Resuelve escenarios prácticos en entornos reales",
          completed: false,
        },
      ],
    },
    final_tips: {
      title: "11. Consejos Finales",
      items: [
        {
          id: 1,
          text: "Domina el uso de la gcloud CLI con comandos frecuentes",
          completed: false,
        },
        {
          id: 2,
          text: "Aprende las best practices de DevOps en Google Cloud",
          completed: false,
        },
        {
          id: 3,
          text: "Mantente actualizado revisando la documentación regularmente",
          completed: false,
        },
      ],
    },
  };
  const { theme, setTheme } = useTheme();
  const [sections, setSections] = useState<Sections>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gcpDevOpsTracker");
      return saved ? JSON.parse(saved) : initialSections;
    }
    return initialSections;
  });

  const [newItemText, setNewItemText] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [progressStats, setProgressStats] = useState<ProgressStats>({
    completed: 0,
    total: 0,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gcpDevOpsTracker", JSON.stringify(sections));
      calculateProgress();
    }
  }, [sections]);

  const calculateProgress = (): void => {
    let completed = 0;
    let total = 0;
    Object.values(sections).forEach((section) => {
      section.items.forEach((item) => {
        if (item.completed) completed++;
        total++;
      });
    });
    setProgressStats({ completed, total });
  };

  const toggleItem = (sectionKey: string, itemId: number): void => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        items: prev[sectionKey].items.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        ),
      },
    }));
  };

  const deleteItem = (sectionKey: string, itemId: number): void => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        items: prev[sectionKey].items.filter((item) => item.id !== itemId),
      },
    }));
    setAlertMessage("Tarea eliminada exitosamente");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const addNewItem = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newItemText.trim() || !selectedSection) {
      setAlertMessage("Por favor, selecciona una sección y escribe una tarea");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setSections((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        items: [
          ...prev[selectedSection].items,
          {
            id: prev[selectedSection].items.length + 1,
            text: newItemText,
            completed: false,
          },
        ],
      },
    }));
    setNewItemText("");
    setAlertMessage("Tarea agregada exitosamente");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen dark:bg-[#141414] bg-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-4">
        {showAlert && (
          <Alert className="mb-4 bg-[#CBE71E] text-black">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Card className="mb-6 dark:bg-[#1c1c1c] dark:border-gray-800">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center dark:text-white">
              GCP DevOps Engineer Exam Tracker
            </h1>
            <div className="text-center text-lg dark:text-gray-300">
              Progreso: {progressStats.completed}/{progressStats.total} tareas
              completadas (
              {((progressStats.completed / progressStats.total) * 100).toFixed(
                1
              )}
              %)
            </div>
          </CardHeader>
        </Card>

        <form onSubmit={addNewItem} className="mb-6 flex gap-2">
          <select
            className="p-2 border rounded flex-1 dark:bg-[#1c1c1c] dark:border-gray-800 dark:text-gray-300"
            value={selectedSection}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedSection(e.target.value)
            }
          >
            <option value="">Selecciona una sección</option>
            {Object.entries(sections).map(([key, section]) => (
              <option key={key} value={key}>
                {section.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nueva tarea"
            className="p-2 border rounded flex-2 dark:bg-[#1c1c1c] dark:border-gray-800 dark:text-gray-300"
            value={newItemText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewItemText(e.target.value)
            }
          />
          <Button
            type="submit"
            className="bg-[#CBE71E] hover:bg-[#b5ce1a] text-black dark:text-black flex items-center gap-2"
          >
            <Plus size={20} /> Añadir
          </Button>
        </form>

        <div className="space-y-6">
          {Object.entries(sections).map(([key, section]) => (
            <Card key={key} className="dark:bg-[#1c1c1c] dark:border-gray-800">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                  <BookOpen size={24} />
                  {section.title}
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-[#242424] rounded transition-colors duration-200"
                    >
                      <div
                        className="flex-1 flex items-center gap-2 cursor-pointer"
                        onClick={() => toggleItem(key, item.id)}
                      >
                        {item.completed ? (
                          <CheckCircle className="text-[#CBE71E]" size={20} />
                        ) : (
                          <Circle
                            className="text-gray-300 dark:text-gray-600"
                            size={20}
                          />
                        )}
                        <span
                          className={`dark:text-gray-300 ${
                            item.completed
                              ? "line-through text-gray-500 dark:text-gray-600"
                              : ""
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100/20"
                        onClick={() => deleteItem(key, item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GCPDevOpsTracker;
