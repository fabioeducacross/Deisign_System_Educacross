# Toast Component

Componente de notificação temporária para feedback ao usuário.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { toast, Toaster } from "@fabioeducacross/ui";

// Adicionar Toaster no root da aplicação
export default function App() {
  return (
    <>
      <YourApp />
      <Toaster />
    </>
  );
}

// Usar toast em qualquer lugar
function MyComponent() {
  return (
    <Button onClick={() => toast("Operação concluída com sucesso!")}>
      Mostrar Toast
    </Button>
  );
}
```

## API do toast()

| Método | Descrição | Exemplo |
|--------|-----------|---------|
| `toast(message)` | Toast padrão | `toast("Mensagem")` |
| `toast.success(message)` | Toast de sucesso | `toast.success("Salvo!")` |
| `toast.error(message)` | Toast de erro | `toast.error("Erro ao salvar")` |
| `toast.warning(message)` | Toast de aviso | `toast.warning("Atenção")` |
| `toast.info(message)` | Toast informativo | `toast.info("Dica útil")` |
| `toast.promise(promise, messages)` | Toast para async | Ver exemplo abaixo |

## Props do Toaster

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` | Posição dos toasts |
| `duration` | `number` | `3000` | Duração padrão em ms |
| `closeButton` | `boolean` | `true` | Mostrar botão de fechar |
| `richColors` | `boolean` | `false` | Cores mais vibrantes |

## Variantes

### Default

```tsx
toast("Esta é uma mensagem padrão");
```

### Success

```tsx
toast.success("Dados salvos com sucesso!");
```

### Error

```tsx
toast.error("Erro ao processar solicitação");
```

### Warning

```tsx
toast.warning("Sua sessão vai expirar em breve");
```

### Info

```tsx
toast.info("Você tem 3 novas notificações");
```

## Exemplos de Uso

### Toast com Título e Descrição

```tsx
toast("Novo usuário criado", {
  description: "João Silva foi adicionado ao sistema",
});
```

### Toast com Ação

```tsx
toast("E-mail enviado", {
  description: "Mensagem enviada para cliente@example.com",
  action: {
    label: "Desfazer",
    onClick: () => console.log("Desfazer envio"),
  },
});
```

### Toast com Duração Customizada

```tsx
// Toast que fica 10 segundos
toast("Mensagem importante", {
  duration: 10000,
});

// Toast que não fecha automaticamente
toast("Leia com atenção", {
  duration: Infinity,
});
```

### Toast Promise (Loading)

```tsx
function SaveButton() {
  const handleSave = async () => {
    const myPromise = fetch("/api/save").then((res) => res.json());

    toast.promise(myPromise, {
      loading: "Salvando...",
      success: (data) => `${data.name} salvo com sucesso!`,
      error: "Erro ao salvar",
    });
  };

  return <Button onClick={handleSave}>Salvar</Button>;
}
```

### Toast com ID (Controlar Múltiplos)

```tsx
function NotificationButton() {
  const toastId = "download-toast";

  const startDownload = () => {
    toast.loading("Iniciando download...", { id: toastId });

    setTimeout(() => {
      toast.success("Download concluído!", { id: toastId });
    }, 3000);
  };

  return <Button onClick={startDownload}>Download</Button>;
}
```

### Toast Dismissível Manualmente

```tsx
const toastId = toast("Processando em background...", {
  duration: Infinity,
});

// Fechar depois
<Button onClick={() => toast.dismiss(toastId)}>
  Fechar Toast
</Button>
```

### Toast com Rich Content

```tsx
toast(
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarImage src="/user.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">João comentou</p>
      <p className="text-sm text-muted-foreground">
        "Ótimo trabalho na apresentação!"
      </p>
    </div>
  </div>
);
```

### Toast de Upload de Arquivo

```tsx
function FileUpload() {
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    const toastId = toast.loading("Enviando arquivo...", {
      description: `0% concluído`,
    });

    // Simular progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        toast.loading("Enviando arquivo...", {
          id: toastId,
          description: `${next}% concluído`,
        });
        
        if (next >= 100) {
          clearInterval(interval);
          toast.success("Arquivo enviado!", { id: toastId });
        }
        
        return next;
      });
    }, 300);
  };

  return <Input type="file" onChange={(e) => handleUpload(e.target.files[0])} />;
}
```

### Toast de Validação de Formulário

```tsx
function FormWithToast() {
  const handleSubmit = (data: FormData) => {
    const errors = validate(data);

    if (errors.length > 0) {
      toast.error("Erros no formulário", {
        description: (
          <ul className="list-disc pl-4 space-y-1">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        ),
        duration: 5000,
      });
    } else {
      toast.success("Formulário enviado!");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Toast de Conexão Perdida

```tsx
useEffect(() => {
  const handleOffline = () => {
    toast.warning("Conexão perdida", {
      description: "Verifique sua internet",
      duration: Infinity,
      id: "offline-toast",
    });
  };

  const handleOnline = () => {
    toast.success("Conexão restabelecida", {
      id: "offline-toast",
    });
  };

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
  };
}, []);
```

### Toast Stack (Múltiplos Toasts)

```tsx
function BulkActions() {
  const processItems = async (items: Item[]) => {
    for (const item of items) {
      try {
        await processItem(item);
        toast.success(`${item.name} processado`);
      } catch (error) {
        toast.error(`Erro ao processar ${item.name}`);
      }
    }
  };

  return <Button onClick={() => processItems(selectedItems)}>Processar Todos</Button>;
}
```

## Configuração do Toaster

### Posições Disponíveis

```tsx
<Toaster position="top-center" />
<Toaster position="top-right" />
<Toaster position="bottom-left" />
```

### Tema e Estilo

```tsx
<Toaster
  position="bottom-right"
  duration={4000}
  closeButton={true}
  richColors={true}
  theme="light" // ou "dark" ou "system"
/>
```

### Customização Global

```tsx
<Toaster
  toastOptions={{
    style: {
      background: "var(--background)",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
    },
    className: "my-custom-toast",
  }}
/>
```

## Acessibilidade

O componente Toast segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Role semântico**: Usa `role="status"` para anúncios não-interruptivos
- ✅ **Aria-live**: `aria-live="polite"` para leitura por screen readers
- ✅ **Foco visível**: Botão de fechar tem foco com `focus-visible:ring-2`
- ✅ **Dismiss por teclado**: Botão de fechar acessível via Tab + Enter
- ✅ **Duração adequada**: Tempo suficiente para leitura (min 3 segundos)

### Exemplo Acessível

```tsx
toast("Novo e-mail recebido", {
  description: "De: maria@example.com",
  duration: 5000,
  closeButton: true,
  important: true, // aria-live="assertive"
});
```

## Boas Práticas

### ✅ Correto

```tsx
// Mensagem clara e concisa
toast.success("Dados salvos com sucesso");

// Usar variant apropriada
toast.error("Erro ao conectar ao servidor");

// Duração adequada para leitura
toast("Mensagem importante", { duration: 5000 });

// Ação útil quando aplicável
toast("Item adicionado ao carrinho", {
  action: {
    label: "Ver carrinho",
    onClick: () => navigate("/cart"),
  },
});
```

### ❌ Incorreto

```tsx
// Mensagem muito longa (dificulta leitura)
toast("Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor...");

// Duração muito curta (não dá tempo de ler)
toast("Mensagem importante", { duration: 500 });

// Muitos toasts simultâneos (poluição visual)
items.forEach((item) => toast(item.name)); // 100 toasts de uma vez

// Toast para erro crítico (usar Dialog)
toast.error("Erro fatal: aplicação será fechada");
```

## Composição com Outros Componentes

### Toast + Form Validation

```tsx
const { handleSubmit } = useForm();

const onSubmit = async (data) => {
  try {
    await api.save(data);
    toast.success("Formulário enviado!");
  } catch (error) {
    toast.error("Erro ao enviar", {
      description: error.message,
    });
  }
};
```

### Toast + Async Actions

```tsx
const deleteItem = async (id: string) => {
  const promise = api.delete(id);

  toast.promise(promise, {
    loading: "Excluindo...",
    success: "Item excluído",
    error: "Erro ao excluir",
  });
};
```

## Links

- [Storybook - Toast Stories](../../../../apps/storybook/stories/components/Toast.stories.tsx)
- [Código Fonte](./Toast.tsx)
- [Testes](./Toast.test.tsx)
- [Documentação Sonner](https://sonner.emilkowal.ski/)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (promise, upload, validação)

### v0.1.1
- ✨ Lançamento inicial baseado em Sonner
- 🎨 5 variantes (default, success, error, warning, info)
- 🔧 API imperativa com toast()
- ⏱️ Duração configurável
- 🎬 Animações suaves
- 🎯 6 posições disponíveis
