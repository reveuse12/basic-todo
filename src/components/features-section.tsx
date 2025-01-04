import { Brain, ListTodo, Sparkles, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Smart Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our AI-powered todo list comes with features that make task management effortless
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <Card>
            <CardHeader>
              <Brain className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>AI Suggestions</CardTitle>
              <CardDescription>
                Get smart suggestions for task organization and prioritization
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <ListTodo className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Smart Lists</CardTitle>
              <CardDescription>
                Automatically categorize and group related tasks
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Sparkles className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Natural Language</CardTitle>
              <CardDescription>
                Add tasks using natural language processing
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Time Estimates</CardTitle>
              <CardDescription>
                AI-powered time estimates for better planning
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}

