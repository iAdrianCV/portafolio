import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TechCategory = 'all' | 'frontend' | 'backend' | 'database';

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database';
  categoryLabel: string;
  subtitle: string;
  bgClass: string;
  borderHoverClass: string;
  iconType: 'svg' | 'material';
  svgData?: string;
  iconName?: string;
  textIcon?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  badge: string;
  roleType: string;
  description: string;
  tags: string[];
  isHighlighted?: boolean;
}

export interface ProjectItem {
  title: string;
  url?: string;
  linkText?: string;
  isPrivate: boolean;
  period: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Navigation & UI State
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly selectedCategory = signal<TechCategory>('all');
  readonly copiedEmail = signal<boolean>(false);
  readonly isContactModalOpen = signal<boolean>(false);
  readonly contactFormSent = signal<boolean>(false);
  readonly activeSection = signal<string>('proyectos');

  // Profile data
  readonly profile = {
    name: 'Adrián Alberto Auccapuma Levano',
    role: 'Desarrollador Full Stack',
    location: 'Santa Anita, Lima, Perú',
    phone: '920 705 398',
    phoneClean: '920705398',
    email: 'adrianauccapuma@gmail.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARJ4yDHiyY7ShaAfasfnfIkK9cPWbGxsNgOhd9YKoB2EgU1JNYnFbmBDy552No1ccmAHRCbPUeaRoeAoeqz5KYhnyiVhfyTlRDZF89PLewOA46l9p658UV3yafy5LBxGB5Ha76sGCq05dbZfd4wIiNCWYyYeWqJ-PpEMgrR0IeJOsCV-GZC24ReYc7Te64MS7P1FYYMH0eVRVFoGS3qDX5q7o-X8SHmn9QYzZRdvoXLdgiWsrh7qo6',
    bio: 'Desarrollador Full Stack con experiencia en el desarrollo de aplicaciones web y sistemas empresariales. Especializado en la creación de soluciones ERP, automatización de procesos corporativos e implementación de aplicaciones escalables orientadas al negocio. Experiencia en tecnologías Front-End y Back-End, bases de datos relacionales, APIs REST y servicios en la nube.'
  };

  // Contact Form Model
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  // Technologies List
  readonly technologies: TechItem[] = [
    {
      name: 'React.js',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'Front-End',
      bgClass: 'bg-cyan-500/10',
      borderHoverClass: 'hover:border-cyan-500/50',
      iconType: 'svg',
      svgData: 'react'
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'ES6+ / Web',
      bgClass: 'bg-yellow-500/10',
      borderHoverClass: 'hover:border-yellow-500/50',
      iconType: 'svg',
      svgData: 'javascript'
    },
    {
      name: 'HTML5',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'Semántica',
      bgClass: 'bg-orange-500/10',
      borderHoverClass: 'hover:border-orange-500/50',
      iconType: 'svg',
      svgData: 'html5'
    },
    {
      name: 'CSS3',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'Estilos Web',
      bgClass: 'bg-blue-500/10',
      borderHoverClass: 'hover:border-blue-500/50',
      iconType: 'svg',
      svgData: 'css3'
    },
    {
      name: 'Angular',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'Front-End',
      bgClass: 'bg-red-500/10',
      borderHoverClass: 'hover:border-red-500/50',
      iconType: 'svg',
      svgData: 'angular'
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'CSS Utility',
      bgClass: 'bg-cyan-400/10',
      borderHoverClass: 'hover:border-cyan-400/50',
      iconType: 'svg',
      svgData: 'tailwind'
    },
    {
      name: 'Diseño UI/UX',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'Prototipado',
      bgClass: 'bg-pink-500/10',
      borderHoverClass: 'hover:border-pink-500/50',
      iconType: 'svg',
      svgData: 'figma'
    },
    {
      name: 'WordPress',
      category: 'frontend',
      categoryLabel: 'Front-End',
      subtitle: 'CMS / Web',
      bgClass: 'bg-blue-600/10',
      borderHoverClass: 'hover:border-blue-600/50',
      iconType: 'svg',
      svgData: 'wordpress'
    },
    {
      name: 'PHP',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Back-End / Core',
      bgClass: 'bg-indigo-500/10',
      borderHoverClass: 'hover:border-indigo-500/50',
      iconType: 'svg',
      svgData: 'php'
    },
    {
      name: 'Laravel',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Framework PHP',
      bgClass: 'bg-red-600/10',
      borderHoverClass: 'hover:border-red-600/50',
      iconType: 'svg',
      svgData: 'laravel'
    },
    {
      name: 'Node.js',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Runtime JS',
      bgClass: 'bg-green-600/10',
      borderHoverClass: 'hover:border-green-600/50',
      iconType: 'svg',
      svgData: 'nodejs'
    },
    {
      name: 'Java & Spring',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Enterprise / OOP',
      bgClass: 'bg-orange-600/10',
      borderHoverClass: 'hover:border-orange-600/50',
      iconType: 'svg',
      svgData: 'java'
    },
    {
      name: 'Python',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Scripting / Odoo',
      bgClass: 'bg-blue-500/10',
      borderHoverClass: 'hover:border-blue-500/50',
      iconType: 'svg',
      svgData: 'python'
    },
    {
      name: 'Odoo ERP',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Módulos & QWeb',
      bgClass: 'bg-purple-600/10',
      borderHoverClass: 'hover:border-purple-600/50',
      iconType: 'svg',
      svgData: 'odoo'
    },
    {
      name: 'API REST',
      category: 'backend',
      categoryLabel: 'Back-End',
      subtitle: 'Endpoints JSON',
      bgClass: 'bg-primary/10',
      borderHoverClass: 'hover:border-primary/50',
      iconType: 'material',
      iconName: 'sync_alt'
    },
    {
      name: 'MySQL',
      category: 'database',
      categoryLabel: 'Bases de Datos',
      subtitle: 'RDBMS',
      bgClass: 'bg-blue-600/10',
      borderHoverClass: 'hover:border-blue-600/50',
      iconType: 'svg',
      svgData: 'mysql'
    },
    {
      name: 'PostgreSQL',
      category: 'database',
      categoryLabel: 'Bases de Datos',
      subtitle: 'SQL Avanzado',
      bgClass: 'bg-sky-700/10',
      borderHoverClass: 'hover:border-sky-700/50',
      iconType: 'svg',
      svgData: 'postgresql'
    },
    {
      name: 'MariaDB',
      category: 'database',
      categoryLabel: 'Bases de Datos',
      subtitle: 'Open Source RDBMS',
      bgClass: 'bg-teal-700/10',
      borderHoverClass: 'hover:border-teal-700/50',
      iconType: 'svg',
      svgData: 'mariadb'
    },
    {
      name: 'SQL Server',
      category: 'database',
      categoryLabel: 'Bases de Datos',
      subtitle: 'Microsoft T-SQL',
      bgClass: 'bg-red-700/10',
      borderHoverClass: 'hover:border-red-700/50',
      iconType: 'svg',
      svgData: 'sqlserver'
    }
  ];

  // Experiences
  readonly experiences: ExperienceItem[] = [
    {
      title: 'Soporte de TI',
      company: 'Jaime Herrera Caballero (CEO Sorami Consulting)',
      badge: 'Soporte de TI',
      roleType: 'Continuo',
      description: 'Soporte técnico directo, configuración integral del ecosistema Apple, optimización y securización de infraestructura tecnológica y resolución de incidencias.',
      tags: ['Ecosistema Apple', 'Soporte de TI', 'Infraestructura'],
      isHighlighted: true
    },
    {
      title: 'Desarrollador Full Stack',
      company: 'G&C Graphic Computer S.A.C.',
      badge: 'Desarrollo Web',
      roleType: 'Full Stack',
      description: 'Desarrollo y mantenimiento de plataformas corporativas, integración de APIs REST, optimización de bases de datos relacionales y diseño de interfaces web responsivas y ágiles.',
      tags: ['PHP / Laravel', 'JavaScript', 'MySQL', 'APIs REST']
    },
    {
      title: 'Programador Python JR. / ERP',
      company: 'SYSTEM OUTSOURCING SAC',
      badge: 'ERP & Automatización',
      roleType: 'Junior',
      description: 'Parametrización y personalización de módulos ERP con Python y Odoo (vistas XML/QWeb), creación de reportes dinámicos, automatización de procesos internos y gestión de datos empresariales.',
      tags: ['Python', 'Odoo ERP', 'XML (QWeb)', 'PostgreSQL']
    }
  ];

  // Projects
  readonly projects: ProjectItem[] = [
    {
      title: 'Rediseño y Migración Web – VMR Firma',
      url: 'https://vmrfirma.com.pe',
      linkText: 'vmrfirma.com.pe',
      isPrivate: false,
      period: 'Sep 2025 – Oct 2025',
      description: 'Rediseño en WordPress, migración integral de correos corporativos, nuevo dominio a una web nueva y hosting nuevo sin interrupción de servicio.',
      tags: ['WordPress', 'Migración Cloud', 'Correos Corporativos', 'Dominio & Hosting', 'PHP', 'Apache']
    },
    {
      title: 'Mantenimiento y Evolución Web – Expocapital Humano',
      url: 'https://expocapitalhumano.com',
      linkText: 'expocapitalhumano.com',
      isPrivate: false,
      period: 'Ene 2023 – Presente',
      description: 'Mantenimiento, administración y evolución web desarrollado en HTML, CSS y JavaScript crudo (vanilla) para portal corporativo de alto tráfico con eventos y captación de registros.',
      tags: ['HTML5 Crudo', 'CSS3', 'JavaScript Crudo', 'MySQL', 'SEO Técnico']
    },
    {
      title: 'Sistema ERP de Administración y Cobranza – Cyberplaza',
      isPrivate: true,
      period: 'Jun 2025 – Dic 2025',
      description: 'Desarrollo de un ERP web privado en PHP crudo (vanilla PHP) orientado a la gestión de cobranzas, administración, finanzas, control de pagos y generación automática de reportes contables.',
      tags: ['PHP Crudo', 'MySQL / PostgreSQL', 'REST API', 'Cobranzas ERP']
    },
    {
      title: 'Sistema ERP de Gestión Empresarial – MALBE',
      isPrivate: true,
      period: 'Mar 2025 – Jun 2025',
      description: 'Desarrollo de un ERP web privado en PHP crudo (vanilla PHP) para la gestión integral de contratos, clientes, pagos y control de módulos por áreas basados en roles y permisos (RBAC).',
      tags: ['PHP Crudo', 'MySQL', 'REST API', 'RBAC', 'Cloud Storage']
    }
  ];

  // Computed filtered list
  readonly filteredTechnologies = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') {
      return this.technologies;
    }
    return this.technologies.filter(t => t.category === cat);
  });

  readonly counts = computed(() => {
    return {
      all: this.technologies.length,
      frontend: this.technologies.filter(t => t.category === 'frontend').length,
      backend: this.technologies.filter(t => t.category === 'backend').length,
      database: this.technologies.filter(t => t.category === 'database').length
    };
  });

  // Methods
  filterTech(category: TechCategory): void {
    this.selectedCategory.set(category);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    const sections = ['proyectos', 'trayectoria', 'stack'];
    const scrollPos = window.scrollY + 180;

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          this.activeSection.set(sectionId);
          return;
        }
      }
    }

    if (window.scrollY < 250) {
      this.activeSection.set('proyectos');
    }
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.activeSection.set(sectionId);
    this.closeMobileMenu();

    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  openContactModal(): void {
    this.isContactModalOpen.set(true);
  }

  closeContactModal(): void {
    this.isContactModalOpen.set(false);
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.profile.email).then(() => {
      this.copiedEmail.set(true);
      setTimeout(() => {
        this.copiedEmail.set(false);
      }, 2500);
    }).catch(() => {
      // Fallback
      this.copiedEmail.set(true);
      setTimeout(() => {
        this.copiedEmail.set(false);
      }, 2500);
    });
  }

  submitContactForm(): void {
    if (!this.contactForm.email || !this.contactForm.name) {
      return;
    }

    // Direct mailto with prefilled body
    const subject = encodeURIComponent(`Contacto desde Portafolio - ${this.contactForm.name}`);
    const body = encodeURIComponent(`Hola Adrián,\n\nMi nombre es: ${this.contactForm.name}\nCorreo de contacto: ${this.contactForm.email}\n\nMensaje:\n${this.contactForm.message}`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;

    this.contactFormSent.set(true);
    setTimeout(() => {
      this.contactFormSent.set(false);
      this.closeContactModal();
      this.contactForm = { name: '', email: '', message: '' };
    }, 2000);
  }
}
