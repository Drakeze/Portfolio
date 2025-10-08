import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin, Code, Palette, Zap, Users, Apple} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const skills = [
    {
      category: "Frontend",
      icon: <Code className="h-5 w-5" />,
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      category: "Backend",
      icon: <Zap className="h-5 w-5" />,
      technologies: ["Node.js","MongoDB",],
    },
    {
      category: "Tools",
      icon: <Users className="h-5 w-5" />,
      technologies: ["Git & Github","Vercel", "Supabase", "Stripe",]
    },
    {
      category: "Learning (Backend)",
      icon: <Apple className="h-5 w-5" />,
      technologies: ["Python", "Redis", "Docker"],
    },
    {
      category: "Learning (Cloud)",
      icon: <Apple className="h-5 w-5" />,
      technologies: ["AWS", "Analytics", "Testing Libraries"],
    }
  ]


  const experience = [
    {
      role: "Founder & Full-Stack Developer",
      company: "Soren Tech",
      period: "2025 - Present",
      description: (
        <>
          <p> •	Founded a startup focused on building professional websites for clients.</p>
          <p> •	Developing and maintaining a growing suite of custom Full-Stack Websites and APIs for sale, while also building custom client APIs on demand.</p>
          <p>•	Leading all aspects of development, from front-end design (Next.js, Tailwind CSS) to backend systems (Node.js, MongoDB).</p>
          <p>•	Managing deployments, hosting, and integration using Vercel, Supabase, and Stripe.</p>
        </>
      ),
    },
    {
      role: "Freelance Web Developer",
      company: "Client Projects",
      period: "2023 - 2024",
      description:
      <>
        <p> •	Delivered custom web solutions for small businesses and entrepreneurs, focusing on responsive design and user experience.</p>
        <p> •	Utilized modern web technologies including React, Next.js, and Tailwind CSS to create dynamic and engaging websites.</p>
        <p>•	Handled all aspects of project management, from initial consultation to final deployment and maintenance.</p>
      </>
    },
    {
      role: "Junior Full-Stack Developer (Contributor)",
      company: "D-Sports Ecosystem (Startup Project)",
      period: "2024 - 2025",
      description:
      <>
      	<p>•	Contributed to a sports and technology platform during its early development phase.</p>
	      <p>•	Focused on junior-level full-stack tasks while building core skills in React, Node.js, and databases.</p>
	      <p>•	Completed my first GitHub project as part of this collaboration.</p>
	      <p>•	Earned my first 3 certifications in web development during this period.</p>
	      <p>•	Gained practical experience with team workflows, Git/GitHub collaboration, and agile development practices.</p>
      </>
    },
  ]


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                Hi, I’m Anthony Shead — a passionate developer on the journey to becoming a polyglot full-stack engineer.
                I love creating clean, functional, and user-centered digital experiences that bring ideas to life.
                Right now, I’m sharpening my skills through the IBM Full-Stack JavaScript Developer Certification and following
                the full-stack roadmap to broaden my foundation. I’ve also been building out Soren Tech, where I’m designing APIs and web solutions that reflect my vision of blending technology, business, and creativity.
                My current focus is mastering Next.js, TypeScript, Tailwind CSS, and MongoDB, while expanding into backend systems,
                Python, and cloud tooling. Long-term, I’m working toward returning to school for Software Engineering, combining my 
                self-taught journey with formal education.
                </p>
                <p>
                Outside of code, you’ll usually find me swimming, hitting the gym, or playing video games. These passions help me
                stay balanced, focused, and creative — whether I’m in the water, at the weights, or in front of a screen.
                If you’d like to connect, let’s talk — I’m excited to bring energy, creativity, and dedication to every
                project I touch.
                </p>
                <p>
                Thanks for stopping by, and I look forward to connecting!(P.S. I have two GitHub accounts, my main account and then my Windows account, check them out!)
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <Button asChild>
                  <Link href="mailto:asheadworking@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/Resume.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/Drakeze" target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/DrakezeWinds" target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://www.linkedin.com/in/anthonyshead/" target="_blank">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="relative">
                <img
                  src="/professional-developer-portrait.png"
                  alt="Profile"
                  className="rounded-2xl shadow-2xl w-full max-w-md"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="border-border hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{skill.icon}</div>
                      <h3 className="font-semibold text-foreground">{skill.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full mr-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2 md:mt-0 self-start">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
